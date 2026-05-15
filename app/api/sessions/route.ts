import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const visitId = searchParams.get('visitId');
    const trainerId = searchParams.get('trainerId');
    const schoolId = searchParams.get('schoolId');

    // Build the where clause dynamically based on provided query parameters
    const whereClause: any = {};
    if (visitId) whereClause.visitId = visitId;
    if (trainerId) whereClause.trainerId = trainerId;
    if (schoolId) {
      whereClause.visit = {
        ...whereClause.visit,
        schoolId: schoolId
      };
    }

    const sessions = await prisma.sessionEntry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        class: true,
        trainer: {
          select: { id: true, name: true, email: true }
        },
        visit: {
          select: { id: true, sessionNumber: true, date: true, schoolId: true, school: true }
        }
      }
    });

    // Optional: Calculate aggregations to return alongside the raw data
    // This provides a "useful aggregated data" format out of the box
    let aggregations = null;
    if (visitId && sessions.length > 0) {
      const totalAttendance = sessions.reduce((sum: number, session: any) => sum + session.attendanceCount, 0);
      const classBreakdown = sessions.map((s: any) => ({
        className: s.className || s.class?.name || 'Unknown',
        attendance: s.attendanceCount,
        totalStudents: s.class?.studentCount || s.attendanceCount
      }));

      aggregations = {
        totalAttendance,
        classBreakdown
      };
    }

    return NextResponse.json({
      data: sessions,
      aggregations
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topicName, attendanceCount, visitId, classId, className, schoolId, trainerId } = body;

    // 1. Validate required fields
    if (!topicName || attendanceCount === undefined || !visitId || !trainerId) {
      return NextResponse.json(
        { message: 'Missing required fields: topicName, attendanceCount, visitId, trainerId' },
        { status: 400 }
      );
    }

    if (!classId && (!className || !schoolId)) {
      return NextResponse.json(
        { message: 'Must provide either classId OR (className and schoolId)' },
        { status: 400 }
      );
    }

    // 2. Validate attendanceCount is >= 0
    if (typeof attendanceCount !== 'number' || attendanceCount < 0) {
      return NextResponse.json(
        { message: 'attendanceCount must be a valid number greater than or equal to 0' },
        { status: 400 }
      );
    }

    // 3. Verify that the visit exists
    const visitExists = await prisma.visit.findUnique({
      where: { id: visitId }
    });

    if (!visitExists) {
      return NextResponse.json(
        { message: 'Invalid visitId. The corresponding Visit could not be found.' },
        { status: 404 }
      );
    }

    // 4. Resolve classId (find or create)
    let finalClassId = classId;
    if (!finalClassId && className && schoolId) {
      // Find existing
      const existingClass = await prisma.class.findFirst({
        where: { name: className, schoolId: schoolId }
      });
      if (existingClass) {
        finalClassId = existingClass.id;
      } else {
        // Create new
        const newClass = await prisma.class.create({
          data: {
            name: className,
            schoolId: schoolId,
            studentCount: attendanceCount // Fallback student count
          }
        });
        finalClassId = newClass.id;
      }
    }

    // 5. Create the session record
    const newSession = await prisma.sessionEntry.create({
      data: {
        topicName,
        attendanceCount,
        className: className || undefined,
        visitId,
        classId: finalClassId,
        trainerId
      },
      include: {
        class: true,
        visit: true
      }
    });

    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    // Prevent duplicates
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'A session record for this class during this visit has already been submitted.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    await prisma.sessionEntry.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Session log deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    const updatedSession = await prisma.sessionEntry.update({
      where: { id },
      data: {
        ...body,
        attendanceCount: body.attendanceCount !== undefined ? Number(body.attendanceCount) : undefined,
      },
    });

    return NextResponse.json(updatedSession);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

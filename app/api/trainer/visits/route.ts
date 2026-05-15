import { NextResponse } from 'next/server';
import prisma, { withRetry } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

// GET /api/trainer/visits - Strictly isolated by trainerId
export async function GET(req: Request) {
  const user = await getAuthUser();
  const { searchParams } = new URL(req.url);
  const visitId = searchParams.get('visitId');
  
  if (!user || user.role !== 'TRAINER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (visitId) {
      const visit = await withRetry(() => prisma.visit.findFirst({
        where: {
          id: visitId,
          trainerId: user.id
        },
        include: {
          school: true,
          sessionEntries: true,
          trainerAttendances: true
        }
      }));
      
      if (!visit) {
        return NextResponse.json({ message: 'Visit not found or access denied' }, { status: 404 });
      }
      
      return NextResponse.json({ visit });
    }

    const visits = await withRetry(() => prisma.visit.findMany({
      where: {
        trainerId: user.id
      },
      include: {
        school: true,
        sessionEntries: true,
        trainerAttendances: true
      },
      orderBy: {
        date: 'desc'
      }
    }));

    return NextResponse.json({ visits });
  } catch (error) {
    console.error('[DATABASE FATAL] Trainer Visits Failed:', error);
    return NextResponse.json({ message: 'Temporary connection issue, please try again' }, { status: 503 });
  }
}

// POST /api/trainer/visits - Submit execution report
export async function POST(req: Request) {
  const user = await getAuthUser();
  const body = await req.json();
  const { visitId, entries } = body;

  if (!user || user.role !== 'TRAINER') {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (!visitId || !entries || !Array.isArray(entries)) {
    return NextResponse.json({ success: false, message: 'Invalid data format' }, { status: 400 });
  }

  try {
    // 1. Verify Visit Existence and Assignment
    const visitExists = await prisma.visit.findUnique({
      where: { id: String(visitId) },
      select: { id: true, trainerId: true, status: true }
    });

    if (!visitExists) {
      return NextResponse.json({ success: false, message: 'Visit record not found.' }, { status: 404 });
    }

    if ((visitExists.status as string) === 'FINALIZED') {
      return NextResponse.json({ success: false, message: 'This visit has been finalized and locked by Admin.' }, { status: 403 });
    }

    if (visitExists.trainerId !== user.id) {
       return NextResponse.json({ success: false, message: 'Unauthorized: You are not assigned to this visit.' }, { status: 403 });
    }

    // 2. Clear old data and insert new (Idempotent submission)
    await withRetry(() => prisma.$transaction([
      prisma.sessionEntry.deleteMany({
        where: { visitId: String(visitId) }
      }),
      ...(entries as any[]).map(entry => {
        const strength = Number(entry.totalStrength) || 0;
        const present = Number(entry.attendanceCount) || 0;
        
        return (prisma.sessionEntry.create as any)({
          data: {
            className: String(entry.className).trim(),
            topicName: String(entry.topicName).trim(),
            attendanceCount: present,
            totalStrength: strength,
            absentCount: Math.max(0, strength - present),
            visitId: String(visitId),
            trainerId: String(user.id)
          }
        });
      }),
      prisma.visit.update({
        where: { id: String(visitId) },
        data: { status: 'SUBMITTED' }
      })
    ]));

    return NextResponse.json({ 
      success: true, 
      message: 'Session report submitted and finalized successfully.' 
    });

  } catch (error: any) {
    console.error('[DATABASE FATAL] Trainer Submission Failed:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Temporary connection issue, please try again' 
    }, { status: 503 });
  }
}

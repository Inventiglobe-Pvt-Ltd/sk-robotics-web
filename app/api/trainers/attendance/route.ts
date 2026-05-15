import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get('trainerId');
    const visitId = searchParams.get('visitId');

    const whereClause: any = {};
    if (trainerId) whereClause.trainerId = trainerId;
    if (visitId) whereClause.visitId = visitId;

    const attendances = await prisma.trainerAttendance.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        trainer: {
          select: { name: true, email: true }
        },
        visit: {
          select: { sessionNumber: true, date: true, school: { select: { name: true } } }
        }
      }
    });

    return NextResponse.json(attendances);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trainerId, visitId, status } = body;

    if (!trainerId || !visitId || !status) {
      return NextResponse.json(
        { message: 'Missing required fields: trainerId, visitId, status' },
        { status: 400 }
      );
    }

    if (!['present', 'absent'].includes(status.toLowerCase())) {
      return NextResponse.json(
        { message: 'Status must be either "present" or "absent"' },
        { status: 400 }
      );
    }

    // Upsert logic: if they marked attendance already, update it (e.g., changed from present to absent)
    const attendance = await prisma.trainerAttendance.upsert({
      where: {
        trainerId_visitId: {
          trainerId,
          visitId,
        }
      },
      update: {
        status: status.toLowerCase(),
      },
      create: {
        trainerId,
        visitId,
        status: status.toLowerCase(),
      },
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

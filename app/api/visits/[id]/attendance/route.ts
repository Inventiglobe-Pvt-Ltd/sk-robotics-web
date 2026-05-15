import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Force TS reload

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: visitId } = await context.params;
    const body = await req.json();
    console.log('Attendance Body:', body);
    const { status, trainerId, markedByAdmin } = body;

    if (!status || !trainerId) {
      return NextResponse.json(
        { message: 'Status and trainerId are required' },
        { status: 400 }
      );
    }
    console.log('Attendance Request:', { visitId, status, trainerId, markedByAdmin });

    const attendance = await prisma.trainerAttendance.upsert({
      where: {
        trainerId_visitId: {
          trainerId,
          visitId,
        },
      },
      update: {
        status,
        markedByAdmin: markedByAdmin || false,
      },
      create: {
        visitId,
        trainerId,
        status,
        markedByAdmin: markedByAdmin || false,
      },
    });

    console.log('Attendance Result:', attendance);
    return NextResponse.json(attendance);
  } catch (error: any) {
    console.error('Detailed Attendance Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta
    });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

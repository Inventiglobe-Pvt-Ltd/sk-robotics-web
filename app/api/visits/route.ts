import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get('schoolId');

    const visits = await prisma.visit.findMany({
      where: schoolId ? { schoolId } : undefined,
      orderBy: { date: 'desc' },
      include: {
        school: true,
        trainer: true,
        trainerAttendances: true,
      }
    });

    return NextResponse.json(visits);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolId, sessionNumber, date, trainerId } = body;

    if (!schoolId || !sessionNumber || !date) {
      return NextResponse.json(
        { message: 'Missing required fields: schoolId, sessionNumber, date' },
        { status: 400 }
      );
    }

    const newVisit = await prisma.visit.create({
      data: {
        schoolId,
        sessionNumber: Number(sessionNumber),
        date: new Date(date),
        trainerId: trainerId || null,
        status: 'ASSIGNED',
      },
    });

    return NextResponse.json(newVisit, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Visit ID is required' }, { status: 400 });
    }

    await prisma.visit.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Visit deleted successfully' });
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
      return NextResponse.json({ message: 'Visit ID is required' }, { status: 400 });
    }

    const updateData: any = { ...body };
    if (body.sessionNumber) updateData.sessionNumber = Number(body.sessionNumber);
    if (body.date) updateData.date = new Date(body.date);
    if (body.trainerId !== undefined) updateData.trainerId = body.trainerId || null;

    const updatedVisit = await prisma.visit.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedVisit);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

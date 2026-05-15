// @ts-nocheck
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const visit = await prisma.visit.findUnique({
      where: { id },
      include: {
        school: {
          include: {
            classes: true
          }
        },
        trainer: true,
        sessionEntries: {
          include: {
            class: true,
            trainer: true
          }
        },
        trainerAttendances: true
      }
    });

    if (!visit) {
      return NextResponse.json({ message: 'Visit not found' }, { status: 404 });
    }

    return NextResponse.json(visit);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

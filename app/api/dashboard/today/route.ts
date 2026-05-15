import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const visits = await prisma.visit.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      },
      include: {
        school: { select: { name: true } },
        trainer: { select: { name: true } }
      },
      orderBy: { date: 'asc' }
    });

    return NextResponse.json(visits);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

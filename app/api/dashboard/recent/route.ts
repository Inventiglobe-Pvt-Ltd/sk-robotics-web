import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const visits = await prisma.visit.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: {
        school: { select: { name: true } },
        trainer: { select: { name: true } },
        sessionEntries: { select: { attendanceCount: true } }
      }
    });

    // Map to include total students per visit
    const visitsWithStats = visits.map(v => ({
      ...v,
      totalStudents: v.sessionEntries.reduce((acc, s) => acc + (s.attendanceCount || 0), 0)
    }));

    return NextResponse.json(visitsWithStats);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

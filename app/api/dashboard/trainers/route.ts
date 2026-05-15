import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const trainers = await prisma.user.findMany({
      where: { role: 'TRAINER' },
      include: {
        visits: {
          include: {
            sessionEntries: { select: { attendanceCount: true } }
          }
        }
      }
    });

    const trainerStats = trainers.map(t => {
      const completedVisits = t.visits.filter(v => ['SUBMITTED', 'FINALIZED', 'COMPLETED'].includes(v.status));
      const totalStudents = t.visits.reduce((acc, v) => {
        return acc + v.sessionEntries.reduce((sAcc, s) => sAcc + (s.attendanceCount || 0), 0);
      }, 0);

      return {
        id: t.id,
        name: t.name,
        totalVisits: t.visits.length,
        completedVisits: completedVisits.length,
        totalStudents: totalStudents
      };
    });

    // Sort by total visits and take top 3
    const topTrainers = trainerStats
      .sort((a, b) => b.totalVisits - a.totalVisits)
      .slice(0, 3);

    return NextResponse.json(topTrainers);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

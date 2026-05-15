import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalSchools, 
      totalSessions, 
      attendanceAgg, 
      totalTrainers,
      totalVisits,
      todayVisits,
      pendingVisits,
      completedVisits
    ] = await Promise.all([
      prisma.school.count(),
      prisma.sessionEntry.count(),
      prisma.sessionEntry.aggregate({
        _sum: { attendanceCount: true },
      }),
      prisma.user.count({
        where: { role: 'TRAINER' },
      }),
      prisma.visit.count(), // Total Visits
      prisma.visit.count({
        where: {
          date: {
            gte: today,
            lt: tomorrow
          }
        }
      }),
      prisma.visit.count({
        where: { status: 'ASSIGNED' }
      }),
      prisma.visit.count({
        where: { status: { in: ['SUBMITTED', 'FINALIZED', 'COMPLETED'] } }
      })
    ]);

    return NextResponse.json({
      totalSchools,
      totalSessions,
      totalStudents: attendanceAgg._sum.attendanceCount || 0,
      totalTrainers,
      totalVisits,
      todayVisits,
      pendingVisits,
      completedVisits
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

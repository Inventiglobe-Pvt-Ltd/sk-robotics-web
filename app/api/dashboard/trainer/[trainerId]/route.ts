import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, context: { params: Promise<{ trainerId: string }> }) {
  try {
    const { trainerId } = await context.params;

    // Fetch aggregate metrics for the trainer
    const [sessionCount, studentAgg, attendanceLogs, visitsAssigned] = await Promise.all([
      prisma.sessionEntry.count({
        where: { trainerId },
      }),
      prisma.sessionEntry.aggregate({
        where: { trainerId },
        _sum: { attendanceCount: true },
      }),
      prisma.trainerAttendance.findMany({
        where: { trainerId },
        include: {
          visit: {
            select: { date: true, sessionNumber: true, school: { select: { name: true } } }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.visit.findMany({
        where: { trainerId },
        select: { id: true, date: true, sessionNumber: true, school: { select: { name: true } } },
        orderBy: { date: 'desc' },
      })
    ]);

    // Calculate Trainer Attendance Percentage
    const totalLogs = attendanceLogs.length;
    const presentLogs = attendanceLogs.filter((log: any) => log.status === 'present').length;
    const attendancePercentage = totalLogs > 0 ? ((presentLogs / totalLogs) * 100).toFixed(1) : 'N/A';

    return NextResponse.json({
      totalSessionsHandled: sessionCount,
      totalStudentsTaught: studentAgg._sum.attendanceCount || 0,
      attendancePercentage: attendancePercentage !== 'N/A' ? `${attendancePercentage}%` : 'N/A',
      attendanceLogs: attendanceLogs.map((log: any) => ({
        status: log.status,
        date: log.visit.date,
        school: log.visit.school.name,
        sessionNumber: log.visit.sessionNumber
      })),
      assignedVisits: visitsAssigned,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

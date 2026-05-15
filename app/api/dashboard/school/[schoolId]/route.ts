import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, context: { params: Promise<{ schoolId: string }> }) {
  try {
    const { schoolId } = await context.params;

    // 1. Fetch aggregate metrics
    const [sessionCount, attendanceAgg, classes, visits] = await Promise.all([
      prisma.sessionEntry.count({
        where: { visit: { schoolId } },
      }),
      prisma.sessionEntry.aggregate({
        where: { visit: { schoolId } },
        _sum: { 
          attendanceCount: true,
          totalStrength: true,
          absentCount: true
        },
      } as any),
      // Fetch classes to map class-wise breakdown
      prisma.class.findMany({
        where: { schoolId },
        select: { id: true, name: true, studentCount: true },
      }),
      // Fetch visits with session aggregates
      prisma.visit.findMany({
        where: { schoolId },
        select: {
          id: true,
          date: true,
          sessionNumber: true,
          sessionEntries: {
            select: { 
              attendanceCount: true,
              totalStrength: true,
              absentCount: true
            },
          },
          _count: {
            select: { sessionEntries: true },
          },
        },
        orderBy: { date: 'desc' },
      } as any),
    ]);

    // 2. Compute class-wise attendance grouping
    const classGroups = await prisma.sessionEntry.groupBy({
      by: ['classId'],
      where: { visit: { schoolId } },
      _sum: { attendanceCount: true },
      _count: { id: true },
    });

    const breakdown = classes.map((c: any) => {
      const group = classGroups.find((g: any) => g.classId === c.id);
      return {
        classId: c.id,
        className: c.name,
        capacity: c.studentCount,
        totalSessions: group?._count.id || 0,
        totalAttendance: group?._sum.attendanceCount || 0,
      };
    });

    // 3. Compute visit-wise summary
    const summary = visits.map((v: any) => ({
      visitId: v.id,
      date: v.date,
      sessionNumber: v.sessionNumber,
      classesCovered: v._count.sessionEntries,
      totalAttendance: v.sessionEntries.reduce((acc: number, curr: any) => acc + curr.attendanceCount, 0),
      totalStrength: v.sessionEntries.reduce((acc: number, curr: any) => acc + (curr.totalStrength || 0), 0),
      totalAbsents: v.sessionEntries.reduce((acc: number, curr: any) => acc + (curr.absentCount || 0), 0),
    }));

    return NextResponse.json({
      totalSessions: sessionCount,
      totalStudents: (attendanceAgg._sum as any)?.attendanceCount || 0,
      totalStrength: (attendanceAgg._sum as any)?.totalStrength || 0,
      totalAbsents: (attendanceAgg._sum as any)?.absentCount || 0,
      classBreakdown: breakdown,
      visitSummary: summary,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

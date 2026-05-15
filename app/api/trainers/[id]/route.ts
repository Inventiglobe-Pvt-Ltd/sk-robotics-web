import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const trainer = await prisma.user.findUnique({
      where: { id },
      include: {
        visits: {
          orderBy: { date: 'desc' },
          include: {
            school: true,
            sessionEntries: true,
            trainerAttendances: true
          }
        },
        trainerAttendances: true
      }
    });

    if (!trainer) {
      return NextResponse.json({ message: 'Trainer not found' }, { status: 404 });
    }

    // Calculate metrics
    const totalVisits = trainer.visits.length;
    
    let totalStudents = 0;
    trainer.visits.forEach((visit: any) => {
      visit.sessionEntries.forEach((session: any) => {
        totalStudents += session.attendanceCount;
      });
    });

    // Attendance calculation based on trainerAttendances in visits
    // Only count attendances that were marked
    const markedAttendances = trainer.trainerAttendances.filter((a: any) => a.status === 'PRESENT' || a.status === 'ABSENT');
    const presentCount = markedAttendances.filter((a: any) => a.status === 'PRESENT').length;
    
    const attendancePercentage = markedAttendances.length > 0 
      ? Math.round((presentCount / markedAttendances.length) * 100) 
      : 0;

    return NextResponse.json({
      trainer,
      totalVisits,
      totalStudents,
      attendancePercentage,
      markedAttendancesCount: markedAttendances.length
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Students per School
    const schoolStats = await prisma.school.findMany({
      include: {
        visits: {
          include: {
            sessionEntries: true
          }
        }
      }
    });

    const studentsPerSchool = schoolStats.map(school => {
      const totalStudents = school.visits.reduce((acc: number, visit: any) => {
        return acc + visit.sessionEntries.reduce((sum: number, session: any) => sum + session.attendanceCount, 0);
      }, 0);
      return {
        name: school.name,
        students: totalStudents
      };
    }).sort((a, b) => b.students - a.students).slice(0, 10); // Top 10

    // 2. Sessions per Trainer
    const trainerStats = await prisma.user.findMany({
      where: { role: 'TRAINER' },
      include: {
        sessionEntries: true
      }
    });

    const sessionsPerTrainer = trainerStats.map(trainer => ({
      name: trainer.name,
      sessions: trainer.sessionEntries.length
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 10);

    // 3. Visit Trends
    const statusCounts = await prisma.visit.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    const visitTrends = statusCounts.map(item => ({
      status: item.status,
      count: item._count.status
    }));

    return NextResponse.json({
      studentsPerSchool,
      sessionsPerTrainer,
      visitTrends
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

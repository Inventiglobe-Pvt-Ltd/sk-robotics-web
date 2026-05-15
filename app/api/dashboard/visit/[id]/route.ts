// @ts-nocheck
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const visit = await prisma.visit.findUnique({
      where: { id: id },
      include: {
        school: { 
          include: {
            classes: {
              orderBy: { name: 'asc' }
            }
          }
        },
        trainer: { select: { id: true, name: true } },
        sessionEntries: {
          include: {
            class: { select: { id: true, name: true, studentCount: true } },
            trainer: { select: { id: true, name: true } },
          },
        },
        trainerAttendances: {
          include: {
            trainer: { select: { id: true, name: true } }
          }
        }
      },
    });

    if (!visit) {
      return NextResponse.json({ message: 'Visit not found' }, { status: 404 });
    }

    const totalAttendance = visit.sessionEntries.reduce((acc: number, curr: any) => acc + curr.attendanceCount, 0);

    const classWiseAttendance = visit.sessionEntries.map((session: any) => ({
      sessionId: session.id,
      className: session.className || session.class?.name || 'Unknown',
      totalStrength: session.totalStrength || session.class?.studentCount || 0,
      attendanceCount: session.attendanceCount,
      absentCount: session.absentCount || 0,
      topicName: session.topicName,
      handledBy: session.trainer.name,
    }));

    // Collect unique trainers involved in this visit
    // This includes the assigned visit trainer, any trainers who submitted sessions, and attendance logs
    const involvedTrainersMap = new Map();
    
    // Add primary assigned trainer
    if (visit.trainer) {
      involvedTrainersMap.set(visit.trainer.id, { id: visit.trainer.id, name: visit.trainer.name, role: 'Assigned' });
    }

    // Add trainers from attendance logs
    visit.trainerAttendances.forEach((ta: any) => {
      involvedTrainersMap.set(ta.trainer.id, { 
        id: ta.trainer.id, 
        name: ta.trainer.name, 
        status: ta.status 
      });
    });

    return NextResponse.json({
      visitInfo: {
        id: visit.id,
        schoolId: visit.schoolId,
        sessionNumber: visit.sessionNumber,
        date: visit.date,
        schoolName: visit.school.name,
        status: visit.status,
      },
      schoolClasses: visit.school.classes,
      totalAttendance,
      classWiseAttendance,
      trainersInvolved: Array.from(involvedTrainersMap.values()),
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

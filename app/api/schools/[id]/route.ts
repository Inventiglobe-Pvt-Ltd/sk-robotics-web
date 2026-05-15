import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const school = await prisma.school.findUnique({
      where: { id },
      include: {
        classes: true,
        visits: {
          orderBy: { date: 'desc' },
          include: {
            trainer: { select: { name: true } },
            sessionEntries: true
          }
        }
      }
    });

    if (!school) {
      return NextResponse.json({ message: 'School not found' }, { status: 404 });
    }

    // Calculate total students reached in this school
    const totalStudents = school.visits.reduce((acc: number, visit: any) => {
      return acc + visit.sessionEntries.reduce((sum: number, session: any) => sum + (session.attendanceCount || 0), 0);
    }, 0);

    const totalStrength = school.visits.reduce((acc: number, visit: any) => {
      return acc + visit.sessionEntries.reduce((sum: number, session: any) => sum + (session.totalStrength || 0), 0);
    }, 0);

    const totalAbsents = school.visits.reduce((acc: number, visit: any) => {
      return acc + visit.sessionEntries.reduce((sum: number, session: any) => sum + (session.absentCount || 0), 0);
    }, 0);

    return NextResponse.json({
      school,
      totalVisits: school.visits.length,
      totalStudents,
      totalStrength,
      totalAbsents
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

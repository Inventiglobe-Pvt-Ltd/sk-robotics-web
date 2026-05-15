import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  
  if (!user || user.role !== 'TRAINER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Only fetch data for THIS trainer
    const visits = await prisma.visit.findMany({
      where: {
        trainerId: user.id
      },
      include: {
        school: true,
        trainerAttendances: true
      }
    });

    const completedVisits = visits.filter(v => (v.status as string) === 'SUBMITTED' || (v.status as string) === 'FINALIZED');
    const pendingVisits = visits.filter(v => (v.status as string) === 'ASSIGNED');

    // Get today's visits
    const today = new Date().toDateString();
    const todaysVisits = visits.filter(v => 
      new Date(v.date).toDateString() === today
    );

    return NextResponse.json({
      trainerName: user.name,
      stats: {
        totalAssigned: visits.length,
        completedCount: completedVisits.length,
        pendingCount: pendingVisits.length
      },
      todaysVisits: todaysVisits.map(v => ({
        id: v.id,
        schoolName: v.school.name,
        date: v.date,
        status: v.status,
        sessionNumber: v.sessionNumber,
        trainerAttendance: v.trainerAttendances[0]?.status || null
      }))
    });
  } catch (error) {
    console.error('Fetch trainer stats failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

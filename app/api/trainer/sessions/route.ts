import { NextResponse } from 'next/server';
import prisma, { withRetry } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  
  if (!user || user.role !== 'TRAINER') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all session entries for this trainer
    const entries = await withRetry(() => prisma.sessionEntry.findMany({
      where: {
        trainerId: user.id
      },
      include: {
        visit: {
          include: {
            school: true
          }
        }
      },
      orderBy: {
        visit: {
          date: 'desc'
        }
      }
    }));

    return NextResponse.json({ 
      success: true, 
      entries: entries.map((e: any) => ({
        id: e.id,
        className: e.className,
        topicName: e.topicName,
        attendanceCount: e.attendanceCount,
        totalStrength: e.totalStrength,
        absentCount: e.absentCount,
        visitDate: e.visit.date,
        schoolName: e.visit.school.name,
        visitId: e.visitId
      }))
    });
  } catch (error) {
    console.error('[DATABASE FATAL] Trainer Sessions Failed:', error);
    return NextResponse.json({ message: 'Temporary connection issue, please try again' }, { status: 503 });
  }
}

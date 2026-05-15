import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return NextResponse.json({ message: 'School ID required' }, { status: 400 });
    }

    // Fetch PAID installments AND those that Admin has chosen to "Send/Notify"
    // @ts-ignore
    const payments = await prisma.paymentInstallment.findMany({
      where: { 
        schoolId,
        status: { in: ['PAID', 'PENDING_NOTIFIED'] }
      },
      orderBy: { installmentNumber: 'asc' }
    });

    return NextResponse.json(payments);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

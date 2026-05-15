import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all installments for a specific school (Admin view)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return NextResponse.json({ message: 'School ID required' }, { status: 400 });
    }

    // @ts-ignore
    const payments = await prisma.paymentInstallment.findMany({
      where: { schoolId },
      orderBy: { installmentNumber: 'asc' }
    });

    return NextResponse.json(payments);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST create a new installment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolId, installmentNumber } = body;

    // @ts-ignore
    const newPayment = await prisma.paymentInstallment.create({
      data: {
        schoolId,
        installmentNumber: Number(installmentNumber),
        status: 'PENDING'
      }
    });

    return NextResponse.json(newPayment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PATCH update installment status (Mark as PAID)
export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const { status, paidDate, notes } = body;

    // @ts-ignore
    const updated = await prisma.paymentInstallment.update({
      where: { id: id as string },
      data: {
        status,
        paidDate: paidDate ? new Date(paidDate) : undefined,
        notes: notes !== undefined ? notes : undefined
      }
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE an installment
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // @ts-ignore
    await prisma.paymentInstallment.delete({
      where: { id: id as string }
    });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

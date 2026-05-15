import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const trainers = await prisma.user.findMany({
      where: { role: 'TRAINER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        // Don't select password
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(trainers);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email, password' },
        { status: 400 }
      );
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTrainer = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: 'TRAINER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      }
    });

    return NextResponse.json(newTrainer, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'A user with this email already exists.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Trainer ID is required' }, { status: 400 });
    }

    // Verify trainer exists
    const trainer = await prisma.user.findUnique({
      where: { id }
    });

    if (!trainer) {
      return NextResponse.json({ message: 'Trainer not found' }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Trainer deleted successfully' });
  } catch (error: any) {
    console.error('Delete trainer error:', error);
    return NextResponse.json({ 
      message: error.code === 'P2003' 
        ? 'Cannot delete trainer as they have active dependencies (visits/sessions).' 
        : error.message 
    }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Trainer ID is required' }, { status: 400 });
    }

    const updateData: any = { ...body };
    
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(body.password, salt);
    }

    const updatedTrainer = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      }
    });

    return NextResponse.json(updatedTrainer);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

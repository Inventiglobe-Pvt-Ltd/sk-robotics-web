// @ts-nocheck
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        classes: true,
      }
    });
    return NextResponse.json(schools);
  } catch (error: any) {
    console.error('API Schools Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Hash password if provided
    const hashedPassword = body.password ? await bcrypt.hash(body.password, 10) : undefined;

    const school = await prisma.school.create({
      data: {
        name: body.name,
        address: body.address,
        principalName: body.principalName,
        contactEmail: body.contactEmail,
        username: body.username,
        password: hashedPassword,
        registrationDate: body.registrationDate ? new Date(body.registrationDate) : new Date()
      },
    });

    return NextResponse.json(school, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'School ID is required' }, { status: 400 });
    }

    // Handle password hashing if it's being updated
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    // Handle registrationDate update
    if (body.registrationDate) {
      body.registrationDate = new Date(body.registrationDate);
    }

    const updatedSchool = await prisma.school.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedSchool);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'School ID is required' }, { status: 400 });
    }

    // Verify school exists
    const school = await prisma.school.findUnique({
      where: { id }
    });

    if (!school) {
      return NextResponse.json({ message: 'School not found' }, { status: 404 });
    }

    console.log(`[API] Attempting to delete school with ID: ${id}`);
    
    await prisma.school.delete({
      where: { id },
    });

    console.log(`[API] School ${id} deleted successfully.`);
    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error: any) {
    console.error('[API] Delete school error:', error);
    return NextResponse.json({ 
      message: error.code === 'P2003' 
        ? 'Cannot delete school as it has active dependencies (visits/classes).' 
        : error.message 
    }, { status: 500 });
  }
}

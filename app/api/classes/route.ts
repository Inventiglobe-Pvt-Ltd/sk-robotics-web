import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get('schoolId');

    const classes = await prisma.class.findMany({
      where: schoolId ? { schoolId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        school: true,
      }
    });

    return NextResponse.json(classes);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, studentCount, schoolId } = body;

    // Basic validation
    if (!name || !studentCount || !schoolId) {
      return NextResponse.json(
        { message: 'Missing required fields: name, studentCount, schoolId' },
        { status: 400 }
      );
    }

    if (typeof studentCount !== 'number' || studentCount < 0) {
      return NextResponse.json(
        { message: 'Invalid studentCount. Must be a positive number.' },
        { status: 400 }
      );
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        studentCount,
        schoolId,
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error: any) {
    // Check for unique constraint violation (e.g., class with same name in same school)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'A class with this name already exists in the selected school.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

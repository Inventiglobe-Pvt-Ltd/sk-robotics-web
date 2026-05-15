// @ts-nocheck
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // @ts-ignore
    const school = await prisma.school.findUnique({
      where: { username },
    });

    // @ts-ignore
    if (!school || !school.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // @ts-ignore
    const isMatch = await bcrypt.compare(password, school.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: school.id, role: 'SCHOOL', name: school.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      id: school.id,
      name: school.name,
      role: 'SCHOOL'
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 500 });
  }
}

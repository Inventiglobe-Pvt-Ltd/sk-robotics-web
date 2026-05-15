import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signJWT } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || user.password !== password || user.role !== 'TRAINER') {
      return NextResponse.json({ message: 'Invalid trainer credentials' }, { status: 401 });
    }

    // Sign JWT token
    const token = await signJWT({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });

    const response = NextResponse.json({ 
      success: true,
      user: { id: user.id, name: user.name, role: user.role } 
    });

    // Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return response;
  } catch (error) {
    console.error('Trainer login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

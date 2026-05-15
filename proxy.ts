import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key'
);

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // 1. Static Assets & Public Roots
    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/static') ||
      pathname === '/' ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    // 2. Auth Pages
    const isAuthPage = pathname === '/login' || pathname === '/school/login';
    if (isAuthPage) {
      // We no longer auto-redirect away from login pages.
      // This allows logged-in users to switch portals via the Hub.
      return NextResponse.next();
    }

    // 3. Protected Portals
    const isAdmin = pathname.startsWith('/admin');
    const isTrainer = pathname.startsWith('/trainer');
    const isSchool = pathname.startsWith('/school');

    if (isAdmin || isTrainer || isSchool) {
      if (!token) {
        const loginUrl = isSchool ? '/school/login' : '/login';
        return NextResponse.redirect(new URL(loginUrl, request.url));
      }

      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const role = payload.role;

        if (isAdmin && role !== 'ADMIN') return NextResponse.redirect(new URL('/login', request.url));
        if (isTrainer && role !== 'TRAINER') return NextResponse.redirect(new URL('/login', request.url));
        if (isSchool && role !== 'SCHOOL') return NextResponse.redirect(new URL('/school/login', request.url));
      } catch (e) {
        const loginUrl = isSchool ? '/school/login' : '/login';
        return NextResponse.redirect(new URL(loginUrl, request.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    // Fail-safe: don't crash the site if proxy logic fails
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

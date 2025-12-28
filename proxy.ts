import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Routes } from './enum';
import { auth } from './lib';

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.includes(Routes.ADMIN);

  const session = req.auth;
  const user = session?.user;
  const isLoggedIn = !!session && !!user;

  if (!isLoggedIn && isAdminRoute) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Routes, UserRole } from './enum';
import { auth } from './lib';

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.includes(Routes.ADMIN);
  const isAuthRoute = pathname.includes(Routes.SIGN_IN);

  const session = req.auth;
  const user = session?.user;
  const isAdmin = user?.role === UserRole.ADMIN;
  const isLoggedIn = !!session && !!user;

  if (isLoggedIn && isAuthRoute) {
    if (isAdmin) {
      return NextResponse.redirect(new URL(Routes.ADMIN, req.nextUrl));
    }
    return NextResponse.redirect(new URL(Routes.HOME, req.nextUrl));
  }

  if (!isLoggedIn && isAdminRoute) {
    return NextResponse.redirect(new URL(Routes.SIGN_IN, req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

import { Routes } from '@/enum';
import { auth } from '@/lib';
import Link from 'next/link';
import Logo from './shared/Logo';
import UserNavInfo from './UserNavInfo';

const NavWrapper = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="border-b border-border py-4 sticky top-0 z-50 bg-background/95 backdrop-blur">
      <nav className="container flex  flex-wrap items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-4 flex-wrap">
          {children}
          {user ? (
            <UserNavInfo user={user} />
          ) : (
            <Link
              className="text-sm border border-border rounded-md px-4 py-2"
              href={Routes.SIGN_IN}
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavWrapper;

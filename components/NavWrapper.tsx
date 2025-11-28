import { Routes } from '@/enum';
import { auth } from '@/lib';
import Link from 'next/link';
import Logo from './shared/Logo';
import ThemeSwitcher from './ThemeSwitcher';
import UserNavInfo from './UserNavInfo';

const NavWrapper = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="border-b border-border py-4">
      <nav className="container flex  flex-wrap items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-4 flex-wrap">
          {children}
          <ThemeSwitcher />
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

import { auth } from '@/lib';
import Logo from './shared/Logo';
import SignInButton from './SignInButton';
import UserNavInfo from './UserNavInfo';

const NavWrapper = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="border-b border-border py-4 sticky top-0 z-50 bg-background/95 backdrop-blur">
      <nav className="container flex  flex-wrap items-center justify-between gap-6">
        <Logo className="text-foreground" />
        <div className="flex items-center gap-4 flex-wrap">
          {children}
          {user ? <UserNavInfo user={user} /> : <SignInButton />}
        </div>
      </nav>
    </header>
  );
};

export default NavWrapper;

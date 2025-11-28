import { Routes, UserRole } from '@/enum';
import { auth } from '@/lib';
import { redirect } from 'next/navigation';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user || session?.user?.role !== UserRole.ADMIN) {
    redirect(Routes.HOME);
  }
  return <>{children}</>;
};

export default ProtectedLayout;

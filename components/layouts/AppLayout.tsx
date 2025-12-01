import NextTopLoader from 'nextjs-toploader';
import QueryProvider from '../providers/QueryProvider';
import SessionProvider from '../providers/SessionProvider';
import AccessTokenCheck from './AccessTokenCheck';
import HydrationLayout from './HydrationLayout';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AccessTokenCheck />
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <SessionProvider>
        <QueryProvider>
          <HydrationLayout>{children}</HydrationLayout>
        </QueryProvider>
      </SessionProvider>
    </>
  );
};

export default AppLayout;

import NextTopLoader from 'nextjs-toploader';
import QueryProvider from '../providers/QueryProvider';
import SessionProvider from '../providers/SessionProvider';
import ThemeProvider from '../providers/ThemeProvider';
import AccessTokenCheck from './AccessTokenCheck';
import HydrationLayout from './HydrationLayout';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AccessTokenCheck />
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <ThemeProvider>
        <SessionProvider>
          <QueryProvider>
            <HydrationLayout>{children}</HydrationLayout>
          </QueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default AppLayout;

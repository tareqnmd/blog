import { getReactQueryClientWithSession } from '@/lib';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const HydrationLayout = async ({ children }: { children: React.ReactNode }) => {
  const getSessionData = async () => {
    const { queryClient } = await getReactQueryClientWithSession();
    return {
      dehydratedState: dehydrate(queryClient),
    };
  };

  const sessionData = await getSessionData();
  return <HydrationBoundary state={sessionData.dehydratedState}>{children}</HydrationBoundary>;
};

export default HydrationLayout;

import NotFoundState from '@/components/shared/states/NotFoundState';
import { APP_CONFIG } from '@/constant';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: `The page you are looking for does not exist on ${APP_CONFIG.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

const NotFound = () => {
  return (
    <main>
      <NotFoundState />
    </main>
  );
};

export default NotFound;

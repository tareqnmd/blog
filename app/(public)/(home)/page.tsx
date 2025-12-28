import Home from '@/modules/dashboard/components/public/Home';
import { homeMetadata } from '@/metadata';

export const metadata = homeMetadata;
export const dynamic = 'force-dynamic';

const Page = () => {
  return <Home />;
};

export default Page;

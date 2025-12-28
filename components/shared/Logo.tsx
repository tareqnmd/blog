import { Routes } from '@/enum';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <div className="text-2xl font-bold">Blog</div>
    </Link>
  );
};

export default Logo;

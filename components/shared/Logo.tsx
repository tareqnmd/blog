import { Routes } from '@/enum';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={Routes.HOME}>
      <div className="text-2xl font-bold">Academy</div>
    </Link>
  );
};

export default Logo;

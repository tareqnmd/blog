import { Routes } from '@/enum/routes.enum';
import Link from 'next/link';
import { RiArrowLeftLine } from 'react-icons/ri';

const BlogBack = () => {
  return (
    <Link href={Routes.BLOGS} className="flex items-center gap-2 w-fit">
      <RiArrowLeftLine className="w-4 h-4" />
      <span>Back to blogs</span>
    </Link>
  );
};

export default BlogBack;

import EmptyState from '@/components/shared/states/EmptyState';
import { Routes } from '@/enum';
import { useRouter } from 'next/navigation';
import { RiRefreshLine } from 'react-icons/ri';

const BlogEmptyList = () => {
  const router = useRouter();
  return (
    <EmptyState
      title="No blogs found"
      description="We couldn't find any blogs matching your criteria."
      action={{
        label: 'Reset filters',
        onClick: () => {
          router.push(Routes.BLOGS, { scroll: false });
        },
        icon: <RiRefreshLine className="text-xl" />,
      }}
    />
  );
};

export default BlogEmptyList;

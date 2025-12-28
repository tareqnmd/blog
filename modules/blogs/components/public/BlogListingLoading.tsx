import { Skeleton } from '@/components/ui/Skeleton';
import BlogCardLoading from './BlogCardLoading';

const BlogListingLoading = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Skeleton className="h-10 md:h-12 w-64 md:w-80" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card-background rounded-2xl p-6 shadow-sm">
          <Skeleton className="h-12 w-full md:w-96 rounded-xl" />
          <Skeleton className="h-12 w-full md:w-64 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <BlogCardLoading key={i} />
        ))}
      </div>
    </div>
  );
};

export default BlogListingLoading;

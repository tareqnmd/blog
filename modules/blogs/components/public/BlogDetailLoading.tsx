import { Skeleton } from '@/components/ui/Skeleton';

const BlogDetailLoading = () => {
  return (
    <div className="grid py-8 md:py-12 gap-4 md:gap-6 max-w-4xl container">
      <Skeleton className="h-10 w-24" />

      <header className="flex flex-col gap-4 md:gap-6">
        <Skeleton className="h-6 w-24 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-10 md:h-14 w-full" />
          <Skeleton className="h-10 md:h-14 w-3/4" />
        </div>

        <Skeleton className="w-full aspect-video rounded-xl" />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </header>

      <div className="space-y-6 mt-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />

          <Skeleton className="h-64 w-full rounded-xl my-6" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t border-border/50">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default BlogDetailLoading;

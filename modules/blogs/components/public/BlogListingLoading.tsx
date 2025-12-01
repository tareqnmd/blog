import { Skeleton } from '@/components/ui/Skeleton';

const BlogListingLoading = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Skeleton className="h-10 md:h-12 w-64 md:w-80" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card-background border border-border rounded-2xl p-6 shadow-sm">
          <Skeleton className="h-12 w-full md:w-96 rounded-xl" />
          <Skeleton className="h-12 w-full md:w-64 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-card-background rounded-2xl overflow-hidden border border-border flex flex-col"
          >
            <Skeleton className="w-full aspect-video rounded-none" />
            <div className="p-4 flex flex-col gap-4 flex-1">
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <hr className="border-border/50 my-1" />
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListingLoading;

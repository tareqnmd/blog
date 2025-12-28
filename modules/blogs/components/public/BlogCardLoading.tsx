import { Skeleton } from '@/components/ui/Skeleton';

const BlogCardLoading = () => {
  return (
    <div className="h-full bg-card-background rounded-2xl overflow-hidden grid grid-rows-[auto_1fr]">
      <div className="relative">
        <Skeleton className="w-full aspect-video rounded-none" />
        <Skeleton className="absolute top-2 left-2 h-6 w-20 rounded-full" />
      </div>
      <div className="p-4 grid grid-rows-[1fr_auto] gap-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <hr className="border-border/50 my-1 mt-auto" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardLoading;

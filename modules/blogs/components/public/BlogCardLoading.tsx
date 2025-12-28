import { Skeleton } from '@/components/ui/Skeleton';

const BlogCardLoading = () => {
  return (
    <div className="h-full bg-card-background rounded-2xl overflow-hidden flex flex-col">
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
  );
};

export default BlogCardLoading;

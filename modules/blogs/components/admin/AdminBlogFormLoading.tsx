import { Skeleton } from '@/components/ui/Skeleton';

const AdminBlogFormLoading = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] gap-6 overflow-hidden">
      <div className="space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-48 w-full max-w-md rounded-lg" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>

      <div className="space-y-2 h-full">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-4 w-44" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-40 max-w-full" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-10 w-[120px] rounded-lg" />
      </div>
    </div>
  );
};

export default AdminBlogFormLoading;

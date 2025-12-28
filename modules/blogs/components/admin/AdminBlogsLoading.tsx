import { Skeleton } from '@/components/ui/Skeleton';

const AdminBlogsLoading = () => {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="rounded-xl bg-card-background border border-border overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_120px_100px_80px_80px_80px_100px_120px] gap-4 p-4 border-b border-border bg-muted/10">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[80px_1fr_120px_100px_80px_80px_80px_100px_120px] gap-4 p-4 border-b border-border last:border-b-0 items-center"
          >
            <Skeleton className="h-12 w-16 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-full max-w-[200px]" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-20" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogsLoading;

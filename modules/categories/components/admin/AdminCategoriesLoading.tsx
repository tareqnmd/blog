import { Skeleton } from '@/components/ui/Skeleton';

const AdminCategoriesLoading = () => {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="rounded-xl bg-card-background border border-border overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_1fr_100px_100px] gap-4 p-4 border-b border-border bg-muted/10">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-16" />
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[60px_1fr_1fr_100px_100px] gap-4 p-4 border-b border-border last:border-b-0 items-center"
          >
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesLoading;

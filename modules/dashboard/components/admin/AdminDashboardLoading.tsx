import { Skeleton } from '@/components/ui/Skeleton';

const AdminDashboardLoading = () => {
  return (
    <div>
      <div className="rounded-2xl bg-card-background border border-border shadow-sm p-6 mb-6">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-card-background border border-border shadow-sm p-6 flex items-center gap-4"
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
        ))}
      </div>

      <section className="mt-2">
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card-background border border-border shadow-sm p-6 flex items-center gap-4"
            >
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardLoading;

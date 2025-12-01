import { Skeleton } from '@/components/ui/Skeleton';

const HomeLoading = () => {
  return (
    <>
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="relative overflow-hidden rounded-xl bg-card-background border border-border">
            <div className="flex flex-col lg:grid lg:grid-cols-2">
              <Skeleton className="h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-none" />
              <div className="p-6 md:p-10 flex flex-col justify-center gap-6 h-full">
                <Skeleton className="h-8 w-32 rounded-full" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-3/4" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-80" />
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-32 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-1.5 w-24 rounded-full" />
            <Skeleton className="h-6 w-96 max-w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-full bg-card-background rounded-2xl overflow-hidden border border-border flex flex-col"
              >
                <Skeleton className="w-full aspect-square rounded-none" />
                <div className="p-4 flex flex-col gap-4 flex-1">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/50 flex gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeLoading;

import { Skeleton } from '@/components/ui/Skeleton';

const AdminBlogsLoading = () => {
  return (
    <div className="grid gap-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-8 w-24 max-w-full" />
          <Skeleton className="h-5 w-64 max-w-full mt-1" />
        </div>
        <Skeleton className="h-10 w-32 max-w-full rounded-lg shrink-0" />
      </div>

      <div className="bg-background rounded-lg shadow overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card-background">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-14" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-12 w-16 rounded-lg" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-5 w-full max-w-[200px]" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-8" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-10" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-end items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-5 w-5 rounded" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogsLoading;

import { Skeleton } from '@/components/ui/Skeleton';

const AdminCategoriesLoading = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="bg-background rounded-lg shadow overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card-background">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-10" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-14" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-10 w-10 rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-5 w-32" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-48" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
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

export default AdminCategoriesLoading;

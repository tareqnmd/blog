import { Skeleton } from '@/components/ui/Skeleton';

const AdminBlogFormLoading = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-64 mt-1" />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6">
        {/* Cover Image */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-48 w-full max-w-md rounded-lg" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Title & Category Row */}
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

        {/* Featured Checkbox */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>

        {/* Tags & Keywords Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-4 w-44" />
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[120px] rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default AdminBlogFormLoading;

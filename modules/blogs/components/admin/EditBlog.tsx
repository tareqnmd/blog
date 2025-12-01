'use client';

import PageHeader from '@/components/shared/PageHeader';
import ErrorState from '@/components/shared/states/ErrorState';
import LoadingState from '@/components/shared/states/LoadingState';
import { Routes } from '@/enum/routes.enum';
import { useParams, useRouter } from 'next/navigation';
import { BlogField } from '../../blog.enum';
import { useBlog, useUpdateBlog } from '../../blog.hooks';
import { IBlogFormData } from '../../blog.type';
import BlogForm from './BlogForm';

const EditBlog = () => {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;
  const { data, isLoading, error } = useBlog(blogId);
  const blog = data?.data ?? {};

  const { mutate: updateBlog, isPending } = useUpdateBlog();

  const handleSubmit = (data: IBlogFormData) => {
    updateBlog(
      { id: blogId, data },
      {
        onSuccess: () => {
          router.push(Routes.ADMIN_BLOGS);
        },
      }
    );
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !blog) {
    return (
      <ErrorState
        title="Blog Not Found"
        description="The blog you're looking for doesn't exist or has been deleted."
      />
    );
  }

  const defaultValues: Partial<IBlogFormData> = {
    [BlogField.TITLE]: blog[BlogField.TITLE],
    [BlogField.CONTENT]: blog[BlogField.CONTENT],
    [BlogField.CATEGORY_ID]: blog[BlogField.CATEGORY_ID],
    [BlogField.COVER_IMAGE]: blog[BlogField.COVER_IMAGE],
    [BlogField.TAGS]: blog[BlogField.TAGS] || '',
    [BlogField.META_KEYWORDS]: blog[BlogField.META_KEYWORDS] || '',
    [BlogField.META_DESCRIPTION]: blog[BlogField.META_DESCRIPTION] || '',
    [BlogField.IS_FEATURED]: blog[BlogField.IS_FEATURED] || false,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Blog"
        description={`Update your blog post: ${blog[BlogField.TITLE]}`}
      />
      <BlogForm onSubmit={handleSubmit} defaultValues={defaultValues} isSubmitting={isPending} />
    </div>
  );
};

export default EditBlog;

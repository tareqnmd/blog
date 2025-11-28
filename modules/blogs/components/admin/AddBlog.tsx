'use client';

import { Routes } from '@/enum/routes.enum';
import { useRouter } from 'next/navigation';
import { useCreateBlog } from '../../blog.hooks';
import { IBlogFormData } from '../../blog.type';
import BlogForm from './BlogForm';

const AddBlog = () => {
  const router = useRouter();
  const { mutate: createBlog, isPending } = useCreateBlog();

  const handleSubmit = (data: IBlogFormData) => {
    createBlog(data, {
      onSuccess: () => {
        router.push(Routes.ADMIN_BLOGS);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create New Blog</h1>
        <p className="text-muted mt-1">Write and publish a new blog post</p>
      </div>

      <BlogForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
};

export default AddBlog;

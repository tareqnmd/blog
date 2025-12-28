import { BlogStatus } from '@/modules/blogs/blog.enum';
import BlogListing from '@/modules/blogs/components/public/BlogListing';
import { CategoryStatus } from '@/modules/categories/categories.enum';
import { blogService } from '@/service/blog.service';
import { categoryService } from '@/service/category.service';
import { use } from 'react';
import { blogsMetadata } from '@/metadata';

export const metadata = blogsMetadata;
export const dynamic = 'force-dynamic';

async function getCategories() {
  const res = await categoryService.getCategories(
    new URLSearchParams({
      status: CategoryStatus.ACTIVE,
      sort: '-createdAt',
    })
  );
  return res?.data ?? [];
}

async function getBlogs(params: { page: string; categoryId: string; title: string }) {
  const res = await blogService.getBlogs(
    new URLSearchParams({
      limit: '12',
      status: BlogStatus.PUBLISHED,
      sort: '-createdAt',
      page: params.page || '1',
      categoryId: params.categoryId || '',
      title: params.title || '',
    })
  );
  return res?.data ?? [];
}

const Page = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; categoryId: string; title: string }>;
}) => {
  const paramsData = use(searchParams);
  const blogs = use(getBlogs(paramsData));
  const categories = use(getCategories());
  return <BlogListing blogs={blogs} categories={categories} params={paramsData} />;
};

export default Page;

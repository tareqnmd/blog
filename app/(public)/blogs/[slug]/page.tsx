import { Routes } from '@/enum';
import BlogDetail from '@/modules/blogs/components/shared/BlogDetail';
import { blogService } from '@/service/blog.service';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getBlog(slug: string) {
  const res = await blogService.getBlogBySlug(slug);
  return res?.data?.[0] ?? null;
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const paramsData = await params;
  const blog = await getBlog(paramsData.slug);
  if (!blog) {
    redirect(Routes.BLOGS);
  }
  return <BlogDetail blog={blog} />;
};

export default Page;

import { BlogStatus } from '@/modules/blogs/blog.enum';
import LatestBlogs from '@/modules/blogs/components/public/LatestBlogs';
import { blogService } from '@/service/blog.service';
import { use } from 'react';

export const dynamic = 'force-dynamic';

async function getBlogs() {
  try {
    const res = await blogService.getBlogs(
      new URLSearchParams({
        limit: '6',
        status: BlogStatus.PUBLISHED,
        sort: '-createdAt',
      })
    );
    return res?.data ?? [];
  } catch {
    return [];
  }
}

const BlogsSection = () => {
  const blogs = use(getBlogs());
  if (!blogs || blogs.length === 0) {
    return null;
  }
  return <LatestBlogs blogs={blogs} />;
};

export default BlogsSection;

import { BlogStatus } from '@/modules/blogs/blog.enum';
import FeaturedBlog from '@/modules/blogs/components/public/FeaturedBlog';
import { blogService } from '@/service/blog.service';
import { use } from 'react';

export const dynamic = 'force-dynamic';

async function getFeaturedBlog() {
  try {
    const res = await blogService.getBlogs(
      new URLSearchParams({
        featured: 'true',
        status: BlogStatus.PUBLISHED,
        limit: '1',
        sort: '-publishedAt',
      })
    );
    return res?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

const FeaturedSection = () => {
  const featuredBlog = use(getFeaturedBlog());
  if (!featuredBlog) {
    return null;
  }
  return <FeaturedBlog blog={featuredBlog} />;
};

export default FeaturedSection;

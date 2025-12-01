import { BlogField } from '@/modules/blogs/blog.enum';
import { IBlog } from '@/modules/blogs/blog.type';
import BlogCategory from '../public/BlogCategoryBadge';
import BlogCoverImage from './BlogCoverImage';
import BlogInfo from './BlogInfo';
import BlogTitle from './BlogTitle';

interface BlogHeaderProps {
  blog: IBlog;
}

const BlogHeader = ({ blog }: BlogHeaderProps) => {
  return (
    <header className="flex flex-col gap-4 md:gap-6">
      <BlogCategory category={blog[BlogField.CATEGORY]} />
      <BlogTitle title={blog[BlogField.TITLE]} />
      <BlogCoverImage title={blog[BlogField.TITLE]} imageUrl={blog[BlogField.COVER_IMAGE]} />
      <BlogInfo blog={blog} />
    </header>
  );
};

export default BlogHeader;

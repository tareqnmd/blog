import { UserField } from '@/enum/field.enum';
import { formatDate } from '@/lib/date.lib';
import { BlogField } from '@/modules/blogs/blog.enum';
import { IBlog } from '@/modules/blogs/blog.type';
import BlogCategory from '../public/BlogCategory';

interface BlogHeaderProps {
  blog: IBlog;
}

const BlogHeader = ({ blog }: BlogHeaderProps) => {
  return (
    <header className="flex items-center gap-4">
      <span>{blog[BlogField.AUTHOR][UserField.NAME]}</span>
      <span>{formatDate(new Date(blog[BlogField.PUBLISHED_AT] || ''))}</span>
      <BlogCategory category={blog[BlogField.CATEGORY]} />
    </header>
  );
};

export default BlogHeader;

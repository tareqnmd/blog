import { IBlog } from '../../blog.type';
import BlogTags from './BlogTags';

const BlogFooter = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <BlogTags blog={blog} />
    </div>
  );
};

export default BlogFooter;

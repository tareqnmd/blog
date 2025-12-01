import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogShare from './BlogShare';
import BlogTags from './BlogTags';

const BlogFooter = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <BlogTags blog={blog} />
      <BlogShare
        title={blog[BlogField.TITLE]}
        link={`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog[BlogField.SLUG]}`}
        className="bg-primary px-3 py-1 rounded-md"
      />
    </div>
  );
};

export default BlogFooter;

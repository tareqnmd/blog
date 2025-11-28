import { BlogField } from '@/modules/blogs/blog.enum';
import { IBlog } from '@/modules/blogs/blog.type';
import BlogLike from './BlogLike';
import BlogShare from './BlogShare';

const BlogLikeShare = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="border-y flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <BlogLike />
        <span>|</span>
        <span>{blog[BlogField.VIEWS]} views</span>
      </div>
      <BlogShare
        title={blog[BlogField.TITLE]}
        link={`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog[BlogField.SLUG]}`}
      />
    </div>
  );
};

export default BlogLikeShare;

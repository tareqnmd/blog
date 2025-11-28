import { Routes } from '@/enum';
import Link from 'next/link';
import { IBlog } from '../../blog.type';
import BlogCard from './BlogCard';

const LatestBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">Latest Blogs</h2>
        <Link
          href={Routes.BLOGS}
          className="text-accent hover:underline font-medium flex items-center gap-2 group"
        >
          View all
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog: IBlog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;

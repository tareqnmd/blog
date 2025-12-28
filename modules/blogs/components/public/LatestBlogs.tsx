'use client';

import { motion } from 'framer-motion';
import { IBlog } from '../../blog.type';
import BlogCard from './BlogCard';

const LatestBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Latest Blogs</h2>
            <div className="h-1.5 w-24 bg-accent rounded-full" />
            <p className="text-muted text-lg max-w-2xl">
              Stay updated with our newest blogs, tutorials, and insights.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {blogs.map((blog: IBlog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;

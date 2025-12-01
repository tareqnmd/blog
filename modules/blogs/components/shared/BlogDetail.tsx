'use client';
import { motion } from 'framer-motion';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogBack from './BlogBack';
import BlogContent from './BlogContent';
import BlogFooter from './BlogFooter';
import BlogHeader from './BlogHeader';

const BlogDetail = ({ blog }: { blog: IBlog }) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid py-8 md:py-12 gap-4 md:gap-6 max-w-4xl container"
    >
      <BlogBack />
      <BlogHeader blog={blog} />
      <BlogContent
        content={blog[BlogField.CONTENT]}
        description={blog[BlogField.META_DESCRIPTION]}
      />
      <BlogFooter blog={blog} />
    </motion.article>
  );
};

export default BlogDetail;

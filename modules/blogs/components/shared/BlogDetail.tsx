'use client';
import { motion } from 'framer-motion';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogContent from './BlogContent';
import BlogCoverImage from './BlogCoverImage';
import BlogHeader from './BlogHeader';
import BlogLikeShare from './BlogLikeShare';
import BlogTags from './BlogTags';
import BlogTitle from './BlogTitle';

const BlogDetail = ({ blog }: { blog: IBlog }) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 md:gap-6"
    >
      <BlogCoverImage title={blog[BlogField.TITLE]} imageUrl={blog[BlogField.COVER_IMAGE]} />
      <BlogTitle title={blog[BlogField.TITLE]} />
      <BlogHeader blog={blog} />
      <BlogLikeShare blog={blog} />
      <BlogContent
        content={blog[BlogField.CONTENT]}
        description={blog[BlogField.META_DESCRIPTION]}
      />
      <BlogTags tags={blog[BlogField.TAGS]} />
    </motion.article>
  );
};

export default BlogDetail;

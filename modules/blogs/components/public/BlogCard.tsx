'use client';
import { Routes } from '@/enum';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogInfo from '../shared/BlogInfo';
import BlogCategoryBadge from './BlogCategoryBadge';

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.1 }}
      className="group h-full bg-card-background rounded-2xl overflow-hidden hover:shadow transition-all border border-border"
    >
      <Link
        href={`${Routes.BLOGS}/${blog[BlogField.SLUG]}`}
        className="flex flex-col h-full relative"
      >
        <Image
          src={blog[BlogField.COVER_IMAGE] || '/images/placeholder.jpg'}
          alt={blog[BlogField.TITLE]}
          width={1000}
          height={1000}
          className="object-cover"
        />
        <BlogCategoryBadge className="absolute top-4 left-4" category={blog[BlogField.CATEGORY]} />
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-xl font-bold group-hover:text-accent line-clamp-2 leading-tight">
            {blog[BlogField.TITLE]}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: blog[BlogField.CONTENT] || 'Read more...' }}
            className="text-muted text-sm line-clamp-2 leading-relaxed"
          ></p>
          <hr className="border-border/50 my-1" />
          <BlogInfo cardView blog={blog} />
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;

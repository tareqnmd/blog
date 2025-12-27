'use client';
import { Routes } from '@/enum';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogInfo from '../shared/BlogInfo';
import BlogTitle from '../shared/BlogTitle';
import BlogCategory from './BlogCategoryBadge';

const FeaturedBlog = ({ blog }: { blog: IBlog }) => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container relative z-10">
        <Link href={`${Routes.BLOGS}/${blog[BlogField.SLUG]}`}>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-xl bg-card-background border border-border transition-all duration-500">
              <div className="flex flex-col lg:grid lg:grid-cols-2">
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={blog[BlogField.COVER_IMAGE] || '/images/placeholder.jpg'}
                    alt={blog[BlogField.TITLE]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center lg:h-full">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-4"
                  >
                    <BlogCategory category={blog[BlogField.CATEGORY]} />
                    <BlogTitle className="group-hover:text-accent" title={blog[BlogField.TITLE]} />
                    <BlogInfo blog={blog} hideShare={true} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.article>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedBlog;

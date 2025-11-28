'use client';
import { Routes } from '@/enum';
import { formatDate } from '@/lib/date.lib';
import { CategoryField } from '@/modules/categories/categories.enum';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group h-full bg-card-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
    >
      <Link href={`${Routes.BLOGS}/${blog[BlogField.SLUG]}`} className="flex flex-col h-full">
        <div className="relative aspect-auto overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            src={blog[BlogField.COVER_IMAGE] || '/images/placeholder.jpg'}
            alt={blog[BlogField.TITLE]}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-border/50">
              {blog[BlogField.CATEGORY][CategoryField.NAME]}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col">
          <div className="flex items-center gap-4 text-xs text-muted font-medium mb-4">
            <span className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-md text-accent">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(new Date(blog[BlogField.PUBLISHED_AT] || ''))}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {blog[BlogField.VIEWS]}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-tight">
            {blog[BlogField.TITLE]}
          </h3>
          <p className="text-muted text-sm mb-6 line-clamp-2 leading-relaxed">
            {blog[BlogField.META_DESCRIPTION] || 'Read more...'}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full from-accent to-purple-600">
                <div className="w-full h-full rounded-full bg-card-background flex items-center justify-center text-xs font-bold text-accent">
                  {blog[BlogField.AUTHOR].name.charAt(0).toUpperCase()}
                </div>
              </div>
              <span className="text-xs font-semibold text-foreground">
                {blog[BlogField.AUTHOR].name}
              </span>
            </div>
            <span className="text-accent text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Article
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;

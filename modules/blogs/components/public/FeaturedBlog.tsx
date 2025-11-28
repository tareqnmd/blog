'use client';
import { Routes } from '@/enum';
import { formatDate } from '@/lib/date.lib';
import { CategoryField } from '@/modules/categories/categories.enum';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';

const FeaturedBlog = ({ blog }: { blog: IBlog }) => {
  return (
    <Link href={`${Routes.BLOGS}/${blog[BlogField.SLUG]}`}>
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-3xl bg-card-background border border-border/50 hover:shadow-2xl transition-all duration-500"
      >
        <div className="grid md:grid-cols-2 gap-0 h-full">
          <div className="relative aspect-auto overflow-hidden h-full min-h-[300px] md:min-h-[400px]">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              src={blog[BlogField.COVER_IMAGE] || '/images/placeholder.jpg'}
              alt={blog[BlogField.TITLE]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 from-black/80 via-transparent to-transparent  md:from-transparent md:to-card-background/5" />

            <div className="absolute top-6 left-6">
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2"
              >
                <span className="text-yellow-500">✨</span> Featured Story
              </motion.span>
            </div>
          </div>

          <div className="relative p-8 md:p-12 flex flex-col justify-center bg-card-background md:bg-transparent z-10">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {blog[BlogField.CATEGORY][CategoryField.NAME]}
                </span>
                <span className="text-muted text-xs font-medium flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted rounded-full" />
                  {formatDate(new Date(blog[BlogField.PUBLISHED_AT] || ''))}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 group-hover:text-accent transition-colors leading-tight">
                {blog[BlogField.TITLE]}
              </h2>

              <p className="text-muted text-lg mb-8 line-clamp-3 leading-relaxed">
                {blog[BlogField.META_DESCRIPTION] || 'Discover the latest insights and stories...'}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full from-accent to-blue-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-card-background flex items-center justify-center font-bold text-accent">
                      {blog[BlogField.AUTHOR].name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm">
                      {blog[BlogField.AUTHOR].name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted font-medium">
                      <span className="flex items-center gap-1">{blog[BlogField.VIEWS]} views</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-accent font-bold group-hover:gap-3 transition-all bg-accent/5 px-4 py-2 rounded-full group-hover:bg-accent/10">
                  Read Article
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default FeaturedBlog;

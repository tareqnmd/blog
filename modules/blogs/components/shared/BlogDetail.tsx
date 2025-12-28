'use client';
import { blogService } from '@/service/blog.service';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogBack from './BlogBack';
import BlogContent from './BlogContent';
import BlogFooter from './BlogFooter';
import BlogHeader from './BlogHeader';

const BlogDetail = ({ blog, incrementView = true }: { blog: IBlog; incrementView?: boolean }) => {
  const blogId = blog[BlogField.ID];
  const [views, setViews] = useState<number>(blog[BlogField.VIEWS] ?? 0);

  const blogWithViews = useMemo(() => {
    return {
      ...blog,
      [BlogField.VIEWS]: views,
    };
  }, [blog, views]);

  useEffect(() => {
    if (!incrementView) return;
    if (!blogId) return;
    if (process.env.NODE_ENV !== 'production') {
      try {
        const key = `__blog_viewed_${blogId}`;
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, '1');
      } catch {}
    }

    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) setViews((v) => v + 1);
    });

    (async () => {
      try {
        const res = await blogService.incrementView(blogId);
        const nextViews = res?.data?.views;
        if (!cancelled && typeof nextViews === 'number') {
          setViews(nextViews);
        }
      } catch {
        if (!cancelled) {
          setViews((v) => v - 1);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [blogId, incrementView]);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid py-4 sm:py-8 md:py-12 gap-6 md:gap-8 max-w-4xl container"
    >
      <BlogBack />
      <BlogHeader blog={blogWithViews} />
      <BlogContent content={blog[BlogField.CONTENT]} />
      <BlogFooter blog={blog} />
    </motion.article>
  );
};

export default BlogDetail;

'use client';

import CustomSelect from '@/components/ui/CustomSelect';
import { Routes } from '@/enum';
import { CategoryField } from '@/modules/categories/categories.enum';
import { ICategory } from '@/modules/categories/categories.type';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogField } from '../../blog.enum';
import { IBlog } from '../../blog.type';
import BlogCard from './BlogCard';
import BlogEmptyList from './BlogEmptyList';

const BlogListing = ({
  blogs,
  categories,
  params,
}: {
  blogs: IBlog[];
  categories: ICategory[];
  params: { page: string; categoryId: string; title: string };
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set(BlogField.TITLE, e.target.value);
    router.push(`${Routes.BLOGS}?${queryParams.toString()}`, { scroll: false });
  };

  const categoryChangeHandler = (value: string) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set(BlogField.CATEGORY_ID, value);
    router.push(`${Routes.BLOGS}?${queryParams.toString()}`, { scroll: false });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">All Articles</h1>
          <p className="text-muted text-lg">
            Explore our collection of articles, tutorials, and insights.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card-background rounded-2xl p-6 shadow-sm">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search articles..."
              value={params[BlogField.TITLE]}
              onChange={titleChangeHandler}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/20 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <CustomSelect
            value={params[BlogField.CATEGORY_ID]}
            onChange={categoryChangeHandler}
            options={categories.map((c: ICategory) => ({
              value: c[CategoryField.ID],
              label: c[CategoryField.NAME],
              icon: c[CategoryField.ICON],
            }))}
            className="w-full md:w-64"
          />
        </div>
      </div>

      {blogs?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs?.map((blog: IBlog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </motion.div>
      ) : (
        <BlogEmptyList />
      )}
    </div>
  );
};

export default BlogListing;

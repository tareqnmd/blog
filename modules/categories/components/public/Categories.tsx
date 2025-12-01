'use client';

import { Routes } from '@/enum';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryField } from '../../categories.enum';
import { ICategory } from '../../categories.type';

const Categories = ({ categories }: { categories: ICategory[] }) => {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Blog by Categories</h2>
          <p className="text-muted-foreground text-lg">
            Find your favorite topics and start reading
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {categories.map((category: ICategory, index: number) => (
            <Link
              key={category[CategoryField.ID]}
              href={`${Routes.BLOGS}?category=${category[CategoryField.ID]}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{
                  scale: 1.025,
                }}
                className="flex items-center justify-center gap-3 px-6 py-2.5 bg-card-background border border-border rounded-xl"
              >
                <Image
                  src={category[CategoryField.ICON]}
                  alt={category[CategoryField.NAME]}
                  width={24}
                  height={24}
                  className="object-cover"
                />
                <h3 className="font-bold text-foreground group-hover:text-accent transition-colors text-base">
                  {category[CategoryField.NAME]}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

'use client';

import { Routes } from '@/enum';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryField } from '../../categories.enum';
import { ICategory } from '../../categories.type';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Categories = ({ categories }: { categories: ICategory[] }) => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">Explore Topics</h2>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories.map((category: ICategory) => (
          <Link
            key={category[CategoryField.ID]}
            href={`${Routes.BLOGS}?category=${category[CategoryField.ID]}`}
          >
            <motion.div
              variants={item}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group h-full bg-card-background border border-border/50 rounded-2xl p-6 hover:border-accent/50 transition-colors text-center cursor-pointer flex flex-col items-center justify-center gap-3 shadow-sm"
            >
              <Image
                src={category[CategoryField.ICON]}
                alt={category[CategoryField.NAME]}
                width={32}
                height={32}
                className="object-cover"
              />
              <h3 className="font-bold text-foreground group-hover:text-accent transition-colors text-lg">
                {category[CategoryField.NAME]}
              </h3>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default Categories;

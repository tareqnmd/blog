import { Routes } from '@/enum';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryField } from '../../categories.enum';
import { ICategory } from '../../categories.type';

const Category = ({ category, index }: { category: ICategory; index: number }) => {
  return (
    <Link
      key={category[CategoryField.ID]}
      href={`${Routes.BLOGS}?categoryId=${category[CategoryField.ID]}`}
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
  );
};

export default Category;

'use client';

import { CategoryField } from '../../categories.enum';
import { ICategory } from '../../categories.type';
import Category from './Category';

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
            <Category key={category[CategoryField.ID]} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

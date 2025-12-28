import { cn } from '@/lib';
import { CategoryField } from '@/modules/categories/categories.enum';
import { ICategory } from '@/modules/categories/categories.type';

const BlogCategoryBadge = ({
  category,
  className,
}: {
  category: ICategory;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'border border-primary px-2 py-1 text-xs rounded-md capitalize shadow-[3px_3px_0_0_var(--primary)] w-max bg-card-background',
        className
      )}
    >
      {category[CategoryField.NAME]}
    </div>
  );
};

export default BlogCategoryBadge;

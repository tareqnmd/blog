import { CategoryField } from '@/modules/categories/categories.enum';
import { ICategory } from '@/modules/categories/categories.type';

const BlogCategory = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-green-400 text-white px-2 py-0.5 text-sm rounded-md">
      {category[CategoryField.NAME]}
    </div>
  );
};

export default BlogCategory;

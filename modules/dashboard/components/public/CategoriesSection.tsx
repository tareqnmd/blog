import { CategoryStatus } from '@/modules/categories/categories.enum';
import Categories from '@/modules/categories/components/public/Categories';
import { categoryService } from '@/service/category.service';
import { use } from 'react';

export const dynamic = 'force-dynamic';

async function getCategories() {
  const searchParams = new URLSearchParams({
    status: CategoryStatus.ACTIVE,
    sort: '-createdAt',
  });
  const res = await categoryService.getCategories(searchParams);
  return res?.data ?? [];
}

const CategoriesSection = () => {
  const categories = use(getCategories());
  if (!categories || categories.length === 0) {
    return null;
  }
  return <Categories categories={categories} />;
};

export default CategoriesSection;

import FormSelect from '@/components/ui/FormSelect';
import { CategoryField, CategoryStatus } from '@/modules/categories/categories.enum';
import { useCategories } from '@/modules/categories/categories.hooks';
import { ICategory } from '@/modules/categories/categories.type';
import { forwardRef, SelectHTMLAttributes } from 'react';

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>((props, ref) => {
  const searchParams = new URLSearchParams();
  searchParams.set('status', CategoryStatus.ACTIVE);
  const { data: categoriesData, isLoading } = useCategories(searchParams);

  return (
    <FormSelect ref={ref} disabled={isLoading} {...props}>
      <option selected value="" disabled>
        {isLoading ? 'Loading...' : 'Select a category'}
      </option>
      {categoriesData?.map((category: ICategory) => (
        <option key={category[CategoryField.ID]} value={category[CategoryField.ID]}>
          {category[CategoryField.NAME]}
        </option>
      ))}
    </FormSelect>
  );
});

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;

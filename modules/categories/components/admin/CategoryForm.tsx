'use client';

import Button from '@/components/ui/Button';
import FormGroup from '@/components/ui/FormGroup';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Controller, useForm } from 'react-hook-form';
import { CategoryField } from '../../categories.enum';
import { ICategoryFormData, ICategoryFormProps } from '../../categories.type';
import { categoryValidation } from '../../categories.validation';

const CategoryForm = ({ onSubmit, defaultValues, isSubmitting = false }: ICategoryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICategoryFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormGroup
        label="Name"
        htmlFor={CategoryField.NAME}
        error={errors[CategoryField.NAME]?.message}
        required
      >
        <FormInput
          id={CategoryField.NAME}
          type="text"
          placeholder="Enter category name"
          {...register(CategoryField.NAME, categoryValidation[CategoryField.NAME])}
        />
      </FormGroup>

      <FormGroup
        label="Icon"
        htmlFor={CategoryField.ICON}
        error={errors[CategoryField.ICON]?.message}
        required
        helperText="Upload a category icon"
      >
        <Controller
          control={control}
          name={CategoryField.ICON}
          rules={categoryValidation[CategoryField.ICON]}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              smallPreview
            />
          )}
        />
      </FormGroup>

      <FormGroup
        label="Description"
        htmlFor={CategoryField.DESCRIPTION}
        error={errors[CategoryField.DESCRIPTION]?.message}
        required
      >
        <FormTextarea
          id={CategoryField.DESCRIPTION}
          rows={4}
          placeholder="Enter category description"
          {...register(CategoryField.DESCRIPTION, categoryValidation[CategoryField.DESCRIPTION])}
        />
      </FormGroup>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;

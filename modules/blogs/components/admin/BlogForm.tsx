'use client';

import Button from '@/components/ui/Button';
import FormGroup from '@/components/ui/FormGroup';
import FormInput from '@/components/ui/FormInput';
import FormRichTextEditor from '@/components/ui/FormRichTextEditor';
import FormTextarea from '@/components/ui/FormTextarea';
import ImageUpload from '@/components/ui/ImageUpload';
import CategorySelect from '@/modules/categories/components/shared/CategorySelect';
import { Controller, useForm } from 'react-hook-form';
import { BlogField } from '../../blog.enum';
import { IBlogFormData, IBlogFormProps } from '../../blog.type';
import { blogValidation } from '../../blog.validation';

const BlogForm = ({ onSubmit, defaultValues, isSubmitting = false }: IBlogFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IBlogFormData>({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] gap-6"
    >
      <FormGroup
        label="Cover Image"
        htmlFor={BlogField.COVER_IMAGE}
        error={errors[BlogField.COVER_IMAGE]?.message}
        required
        helperText="Upload blog cover image"
      >
        <Controller
          control={control}
          name={BlogField.COVER_IMAGE}
          rules={blogValidation[BlogField.COVER_IMAGE]}
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} disabled={isSubmitting} />
          )}
        />
      </FormGroup>

      <div className="grid md:grid-cols-2 gap-6">
        <FormGroup
          label="Title"
          htmlFor={BlogField.TITLE}
          error={errors[BlogField.TITLE]?.message}
          required
        >
          <FormInput
            id={BlogField.TITLE}
            type="text"
            placeholder="Enter blog title"
            {...register(BlogField.TITLE, blogValidation[BlogField.TITLE])}
          />
        </FormGroup>
        <FormGroup
          label="Category"
          htmlFor={BlogField.CATEGORY_ID}
          error={errors[BlogField.CATEGORY_ID]?.message}
          required
        >
          <Controller
            control={control}
            name={BlogField.CATEGORY_ID}
            rules={blogValidation[BlogField.CATEGORY_ID]}
            render={({ field }) => (
              <CategorySelect
                id={BlogField.CATEGORY_ID}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </FormGroup>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormGroup
          label="Featured Blog"
          htmlFor={BlogField.IS_FEATURED}
          helperText="Mark this blog as featured (only one blog should be featured at a time)"
        >
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card-background">
            <input
              id={BlogField.IS_FEATURED}
              type="checkbox"
              className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
              {...register(BlogField.IS_FEATURED)}
            />
            <label
              htmlFor={BlogField.IS_FEATURED}
              className="text-sm text-foreground cursor-pointer"
            >
              Set as featured blog
            </label>
          </div>
        </FormGroup>
      </div>

      <FormGroup
        label="Content"
        htmlFor={BlogField.CONTENT}
        error={errors[BlogField.CONTENT]?.message}
        required
        className="flex flex-col gap-2 h-full"
      >
        <FormRichTextEditor
          className="h-full"
          name={BlogField.CONTENT}
          control={control}
          rules={blogValidation[BlogField.CONTENT]}
          placeholder="Start writing your blog content..."
        />
      </FormGroup>

      <div className="grid md:grid-cols-2 gap-6">
        <FormGroup
          label="Tags (Optional)"
          htmlFor={BlogField.TAGS}
          error={errors[BlogField.TAGS]?.message}
          helperText="Separate tags with commas"
        >
          <FormInput
            id={BlogField.TAGS}
            type="text"
            placeholder="e.g., react, javascript, web-development"
            {...register(BlogField.TAGS, blogValidation[BlogField.TAGS])}
          />
        </FormGroup>

        <FormGroup
          label="Meta Keywords (Optional)"
          htmlFor={BlogField.META_KEYWORDS}
          error={errors[BlogField.META_KEYWORDS]?.message}
          helperText="Keywords for SEO optimization"
        >
          <FormInput
            id={BlogField.META_KEYWORDS}
            type="text"
            placeholder="Enter SEO keywords"
            {...register(BlogField.META_KEYWORDS, blogValidation[BlogField.META_KEYWORDS])}
          />
        </FormGroup>
      </div>

      <FormGroup
        label="Meta Description (Optional)"
        htmlFor={BlogField.META_DESCRIPTION}
        error={errors[BlogField.META_DESCRIPTION]?.message}
        helperText="This description will appear in search engine results"
      >
        <FormTextarea
          id={BlogField.META_DESCRIPTION}
          placeholder="Brief description for search engines (recommended 150-160 characters)"
          rows={3}
          {...register(BlogField.META_DESCRIPTION, blogValidation[BlogField.META_DESCRIPTION])}
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

export default BlogForm;

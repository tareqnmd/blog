import { ICategory } from '@/modules/categories/categories.type';
import { IUser } from '@/types/common.types';
import { BlogField, BlogStatus } from './blog.enum';

export interface IBlog {
  [BlogField.ID]: string;
  [BlogField.TITLE]: string;
  [BlogField.SLUG]: string;
  [BlogField.CONTENT]: string;
  [BlogField.COVER_IMAGE]: string;
  [BlogField.AUTHOR]: IUser;
  [BlogField.AUTHOR_ID]: string;
  [BlogField.CATEGORY_ID]: string;
  [BlogField.CATEGORY]: ICategory;
  [BlogField.TAGS]: string;
  [BlogField.VIEWS]: number;
  [BlogField.STATUS]: BlogStatus;
  [BlogField.IS_FEATURED]: boolean;
  [BlogField.CREATED_AT]: string;
  [BlogField.UPDATED_AT]: string;
  [BlogField.PUBLISHED_AT]?: string;
  [BlogField.META_KEYWORDS]?: string;
  [BlogField.META_DESCRIPTION]?: string;
}

export interface IBlogFormData {
  [BlogField.TITLE]: string;
  [BlogField.CONTENT]: string;
  [BlogField.CATEGORY_ID]: string;
  [BlogField.COVER_IMAGE]: string | File;
  [BlogField.TAGS]?: string;
  [BlogField.META_KEYWORDS]?: string;
  [BlogField.META_DESCRIPTION]?: string;
  [BlogField.IS_FEATURED]?: boolean;
  [BlogField.STATUS]?: BlogStatus;
}

export interface IBlogFormProps {
  onSubmit: (data: IBlogFormData) => void;
  defaultValues?: Partial<IBlogFormData>;
  isSubmitting?: boolean;
}

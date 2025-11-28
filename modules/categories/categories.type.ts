import { CategoryField, CategoryStatus } from './categories.enum';

export interface ICategory {
  [CategoryField.ID]: string;
  [CategoryField.NAME]: string;
  [CategoryField.DESCRIPTION]: string;
  [CategoryField.ICON]: string;
  [CategoryField.STATUS]: CategoryStatus;
}

export interface ICategoryFormProps {
  onSubmit: (data: ICategoryFormData) => void;
  defaultValues?: Partial<ICategoryFormData>;
  isSubmitting?: boolean;
}

export interface ICategoryFormData {
  [CategoryField.NAME]: string;
  [CategoryField.DESCRIPTION]: string;
  [CategoryField.ICON]: string | File;
}

export interface IUpdateCategoryStatusFormData {
  [CategoryField.STATUS]: CategoryStatus;
}

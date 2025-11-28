import { CategoryField } from './categories.enum';

export const categoryValidation = {
  [CategoryField.NAME]: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name must not exceed 50 characters',
    },
  },
  [CategoryField.DESCRIPTION]: {
    required: 'Description is required',
    minLength: {
      value: 10,
      message: 'Description must be at least 10 characters',
    },
    maxLength: {
      value: 500,
      message: 'Description must not exceed 500 characters',
    },
  },
  [CategoryField.ICON]: {
    required: 'Icon is required',
    minLength: {
      value: 1,
      message: 'Icon is required',
    },
  },
};

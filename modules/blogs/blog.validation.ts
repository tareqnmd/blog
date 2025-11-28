import { BlogField } from './blog.enum';

// Helper function to extract text content from HTML
const getTextFromHtml = (html: string): string => {
  if (!html) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export const blogValidation = {
  [BlogField.TITLE]: {
    required: 'Title is required',
    minLength: {
      value: 3,
      message: 'Title must be at least 3 characters',
    },
    maxLength: {
      value: 200,
      message: 'Title must not exceed 200 characters',
    },
  },
  [BlogField.COVER_IMAGE]: {
    required: 'Cover image is required',
  },
  [BlogField.CONTENT]: {
    required: 'Content is required',
    validate: {
      notEmpty: (value: string) => {
        const textContent = getTextFromHtml(value || '');
        return textContent.trim().length > 0 || 'Content cannot be empty';
      },
      minLength: (value: string) => {
        const textContent = getTextFromHtml(value || '');
        return textContent.trim().length >= 50 || 'Content must be at least 50 characters';
      },
    },
  },
  [BlogField.CATEGORY_ID]: {
    required: 'Category is required',
    validate: (value: string) => value !== '' || 'Please select a valid category',
  },
  [BlogField.META_KEYWORDS]: {
    maxLength: {
      value: 255,
      message: 'Meta keywords must not exceed 255 characters',
    },
  },
  [BlogField.META_DESCRIPTION]: {
    maxLength: {
      value: 500,
      message: 'Meta description must not exceed 500 characters',
    },
  },
  [BlogField.TAGS]: {
    maxLength: {
      value: 255,
      message: 'Tags must not exceed 255 characters',
    },
  },
};

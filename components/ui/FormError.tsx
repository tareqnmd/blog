import { cn } from '@/lib/cn.lib';
import { HTMLAttributes } from 'react';

interface FormErrorProps extends HTMLAttributes<HTMLSpanElement> {
  message?: string;
}

const FormError = ({ message, className, ...props }: FormErrorProps) => {
  if (!message) return null;

  return (
    <span className={cn('text-red-500 text-sm', className)} role="alert" {...props}>
      {message}
    </span>
  );
};

export default FormError;

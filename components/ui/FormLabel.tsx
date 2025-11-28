import { cn } from '@/lib/cn.lib';
import { LabelHTMLAttributes } from 'react';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const FormLabel = ({ children, className, required = false, ...props }: FormLabelProps) => {
  return (
    <label className={cn('text-sm font-medium', className)} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default FormLabel;

import { cn } from '@/lib/cn.lib';
import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full h-10 border border-border rounded px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      {...props}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;

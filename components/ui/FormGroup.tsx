import { ReactNode } from 'react';
import FormError from './FormError';
import FormLabel from './FormLabel';

interface FormGroupProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  helperText?: string;
}

const FormGroup = ({
  label,
  htmlFor,
  error,
  required,
  children,
  className = 'flex flex-col gap-2',
  helperText,
}: FormGroupProps) => {
  return (
    <div className={className}>
      <FormLabel htmlFor={htmlFor} required={required}>
        {label}
      </FormLabel>
      {children}
      <FormError message={error} />
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default FormGroup;

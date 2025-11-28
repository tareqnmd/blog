'use client';

import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import RichTextEditor from './RichTextEditor';
import { cn } from '@/lib/cn.lib';

interface FormRichTextEditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const FormRichTextEditor = <T extends FieldValues>({
  name,
  control,
  rules,
  placeholder,
  className,
  disabled,
}: FormRichTextEditorProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={cn('h-full', fieldState.error ? 'ring-2 ring-red-500 rounded-lg' : '')}>
          <RichTextEditor
            value={field.value || ''}
            onChange={field.onChange}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          />
        </div>
      )}
    />
  );
};

export default FormRichTextEditor;

'use client';

import { cn } from '@/lib';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string | File;
  onChange: (value: File | string) => void;
  disabled?: boolean;
  smallPreview?: boolean;
}

const ImageUpload = ({ value, onChange, disabled, smallPreview = false }: ImageUploadProps) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      const timer = setTimeout(() => setObjectUrl(url), 0);
      return () => {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
      };
    }
  }, [value]);

  const preview = typeof value === 'string' ? value : value instanceof File ? objectUrl : null;

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large (max 5MB)');
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col gap-4">
      {preview ? (
        <div
          className={cn(
            'relative rounded-md overflow-hidden border border-border',
            smallPreview ? 'w-[64px] h-[64px]' : 'w-full h-[200px]'
          )}
        >
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full z-10 hover:bg-red-600 transition"
            type="button"
            disabled={disabled}
          >
            <FiX size={smallPreview ? 12 : 16} />
          </button>
          <Image
            src={preview}
            alt="Uploaded image"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg transition relative ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload className="w-8 h-8 mb-3 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span>
            </p>
          </div>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleUpload}
            disabled={disabled}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  loading?: boolean;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = 'Select option',
  className = '',
  loading = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const isImageUrl = (url: string) => {
    return url.startsWith('http') || url.startsWith('/') || url.startsWith('data:image');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => !loading && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-background text-foreground transition-all ${
          isOpen ? 'border-accent ring-2 ring-accent/20' : 'border-border hover:border-accent/50'
        } ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        type="button"
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <>
                  {isImageUrl(selectedOption.icon) ? (
                    <Image
                      src={selectedOption.icon}
                      alt={selectedOption.label}
                      width={20}
                      height={20}
                      className="object-cover rounded-sm"
                    />
                  ) : (
                    <span>{selectedOption.icon}</span>
                  )}
                </>
              )}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <div className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-card-background border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  value === option.value
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-foreground hover:bg-accent/5'
                }`}
              >
                {option.icon && (
                  <>
                    {isImageUrl(option.icon) ? (
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={20}
                        height={20}
                        className="object-cover rounded-sm"
                      />
                    ) : (
                      <span className="text-lg">{option.icon}</span>
                    )}
                  </>
                )}
                <span>{option.label}</span>
                {value === option.value && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;

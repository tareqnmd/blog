import { cn } from '@/lib/cn.lib';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
}

const Button = ({ children, className, variant = 'primary', icon, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center cursor-pointer justify-center gap-2 text-lg font-medium transition-all duration-300 h-auto',
        variant === 'primary' && 'border border-border rounded py-2 px-4',
        variant === 'secondary' && 'py-2 px-4',
        variant === 'outline' && 'py-2 px-4',
        variant === 'ghost' && 'py-2 px-4',
        variant === 'icon' && 'p-2',
        className
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;

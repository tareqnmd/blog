import { cn } from '@/lib/cn.lib';
import React from 'react';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader = ({ title, description, action, className, ...props }: PageHeaderProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 flex-wrap', className)} {...props}>
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;

import Button from '@/components/ui/Button';
import { ReactNode } from 'react';
import { RiFileSearchLine } from 'react-icons/ri';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

const EmptyState = ({
  title = 'No items found',
  description = "We couldn't find any items matching your criteria.",
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/10">
        {icon || <RiFileSearchLine className="h-10 w-10 text-muted-foreground/60" />}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>

      <p className="mb-8 max-w-sm text-muted-foreground">{description}</p>

      {action && (
        <Button onClick={action.onClick} variant="outline" icon={action.icon}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

import Logo from '@/components/shared/Logo';
import { cn } from '@/lib';

const LoadingState = ({ className }: { className?: string }) => {
  return (
    <div className={cn('grid min-h-screen place-items-center bg-background', className)}>
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Logo />
      </div>
    </div>
  );
};

export default LoadingState;

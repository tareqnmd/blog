import Logo from '@/components/shared/Logo';
import { RiLoader4Line } from 'react-icons/ri';

const LoadingState = ({ message }: { message?: string }) => {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <RiLoader4Line className="w-8 h-8 text-accent animate-spin" />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingState;

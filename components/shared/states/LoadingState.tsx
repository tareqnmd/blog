import Logo from '@/components/shared/Logo';

const LoadingState = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Logo />
      </div>
    </div>
  );
};

export default LoadingState;

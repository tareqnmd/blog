import Button from '@/components/ui/Button';
import { Routes } from '@/enum';
import Link from 'next/link';
import { RiErrorWarningLine, RiHome4Line, RiRefreshLine } from 'react-icons/ri';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'We encountered an unexpected error. Our team has been notified.',
  retry,
  showHomeButton = true,
}: {
  title?: string;
  description?: string;
  retry?: () => void;
  showHomeButton?: boolean;
}) => {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] place-items-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20 opacity-75 duration-1000" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <RiErrorWarningLine className="h-12 w-12" />
            </div>
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <p className="mb-8 text-muted-foreground">{description}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {retry && (
            <Button onClick={retry} icon={<RiRefreshLine className="text-xl" />}>
              Try Again
            </Button>
          )}
          {showHomeButton && (
            <Link href={Routes.HOME}>
              <Button variant="outline" icon={<RiHome4Line className="text-xl" />}>
                Back to Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;

import Button from '@/components/ui/Button';
import { Routes } from '@/enum';
import Link from 'next/link';
import { RiHome4Line, RiMapPinLine } from 'react-icons/ri';

interface NotFoundStateProps {
  title?: string;
  description?: string;
  backLink?: string;
  backLabel?: string;
}

const NotFoundState = ({
  title = 'Page not found',
  description = "Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.",
  backLink = Routes.HOME,
  backLabel = 'Back to Home',
}: NotFoundStateProps) => {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] place-items-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl" />
            <div className="relative text-9xl font-black text-accent opacity-20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <RiMapPinLine className="h-16 w-16 text-accent" />
            </div>
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <p className="mb-8 text-muted-foreground">{description}</p>

        <Link href={backLink} className="inline-block">
          <Button icon={<RiHome4Line className="text-xl" />}>{backLabel}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundState;

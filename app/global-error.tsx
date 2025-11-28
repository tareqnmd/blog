'use client';

import ErrorState from '@/components/shared/states/ErrorState';
import '@/styles/globals.css';
import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
});

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <main className="grid min-h-screen place-items-center bg-background text-foreground">
          <ErrorState
            title="Critical Error"
            description={error.message || 'A critical system error occurred. Please try again.'}
            retry={reset}
            showHomeButton={false}
          />
        </main>
      </body>
    </html>
  );
};

export default GlobalError;

'use client';

import ErrorState from '@/components/shared/states/ErrorState';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <main>
      <ErrorState
        retry={reset}
        description={
          error.message || 'We encountered an unexpected error. Our team has been notified.'
        }
      />
    </main>
  );
};

export default Error;

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Container className="text-center">
        <h1 className="text-display-1 md:text-display-0 text-(--on-bg-high) mb-4">500</h1>
        <h2 className="text-display-3 text-(--on-bg-medium) mb-6">Something went wrong</h2>
        <p className="text-body-1 text-(--on-bg-low) max-w-md mx-auto mb-8">
          We're working on fixing it. Please try again later.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="filled" size="large" onClick={reset}>Try again</Button>
          <Link href="/">
            <Button variant="outlined" size="large">Go home</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

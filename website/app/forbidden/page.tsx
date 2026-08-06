import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forbidden',
  robots: { index: false, follow: false },
};

export default function ForbiddenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Container className="text-center">
        <h1 className="text-display-1 md:text-display-0 text-(--on-bg-high) mb-4">403</h1>
        <h2 className="text-display-3 text-(--on-bg-medium) mb-6">Access denied</h2>
        <p className="text-body-1 text-(--on-bg-low) max-w-md mx-auto mb-8">
          You don't have permission to access this page.
        </p>
        <Link href="/">
          <Button variant="filled" size="large">Go home</Button>
        </Link>
      </Container>
    </div>
  );
}

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Container className="text-center">
        <h1 className="text-display-1 md:text-display-0 text-(--on-bg-high) mb-4">404</h1>
        <h2 className="text-display-3 text-(--on-bg-medium) mb-6">Page not found</h2>
        <p className="text-body-1 text-(--on-bg-low) max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="filled" size="large">Go home</Button>
        </Link>
      </Container>
    </div>
  );
}

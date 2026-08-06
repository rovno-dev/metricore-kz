import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your account profile',
};

async function getUserData() {
  const cookieStore = await cookies();
  const access = cookieStore.get('access_token')?.value;
  if (!access) {
    redirect('/login');
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/main/v1/users/me`, {
      headers: { Authorization: `Bearer ${access}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      redirect('/login');
    }
    return await res.json();
  } catch {
    redirect('/login');
  }
}

export default async function ProfilePage() {
  const user = await getUserData();

  return (
    <Container className="py-10 md:py-12 max-w-2xl">
      <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6">Profile</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-body-3 font-medium text-(--on-bg-medium)">User ID</h2>
            <p className="text-body-2 text-(--on-bg-high)">{user.id}</p>
          </div>
          {user.email && (
            <div>
              <h2 className="text-body-3 font-medium text-(--on-bg-medium)">Email</h2>
              <p className="text-body-2 text-(--on-bg-high)">{user.email}</p>
            </div>
          )}
          {user.phone && (
            <div>
              <h2 className="text-body-3 font-medium text-(--on-bg-medium)">Phone</h2>
              <p className="text-body-2 text-(--on-bg-high)">{user.phone}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Link href="/">
            <Button variant="outlined" size="medium">Back to Home</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}

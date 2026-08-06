import { Metadata } from 'next';
import { LoginForm } from './_components/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Unidoka UI account to manage orders and wishlist.',
};

export default function LoginPage() {
  return <LoginForm />;
}

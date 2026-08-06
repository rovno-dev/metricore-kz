import { Metadata } from 'next';
import { RegisterForm } from './_components/register-form';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join Unidoka UI to start shopping and manage your wishlist.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}

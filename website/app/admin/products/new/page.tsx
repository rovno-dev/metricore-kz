import { Metadata } from 'next';
import { NewProductForm } from './_components/new-product-form';

export const metadata: Metadata = {
  title: 'Add New Product',
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
  return <NewProductForm />;
}

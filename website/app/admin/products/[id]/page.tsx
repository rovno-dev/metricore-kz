import { Metadata } from 'next';
import { EditProductForm } from './_components/edit-product-form';

export const metadata: Metadata = {
  title: 'Edit Product',
  robots: { index: false, follow: false },
};

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <EditProductForm id={params.id} />;
}

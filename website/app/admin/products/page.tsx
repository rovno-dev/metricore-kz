import { Metadata } from 'next';
import { ProductsList } from './_components/products-list';

export const metadata: Metadata = {
  title: 'Manage Products',
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return <ProductsList />;
}

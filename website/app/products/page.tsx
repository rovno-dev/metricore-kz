import { Metadata } from 'next';
import { ProductsContent } from './_components/products-content';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our premium collection of hoodies, mugs, accessories, and more.',
};

export default function ProductsPage() {
  return <ProductsContent />;
}

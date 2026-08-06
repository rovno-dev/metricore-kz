import { Metadata } from 'next';
import { WishlistContent } from './_components/wishlist-content';

export const metadata: Metadata = {
  title: 'Your Wishlist',
  description: 'View and manage your saved products on Unidoka UI.',
};

export default function WishlistPage() {
  return <WishlistContent />;
}

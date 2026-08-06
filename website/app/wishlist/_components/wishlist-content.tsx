"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/layout/product-card/product-card";
import { useWishlist } from "@/providers/wishlist-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WishlistContent() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-display-2 text-(--on-bg-high) mb-4">Your wishlist is empty</h1>
        <p className="text-body-2 text-(--on-bg-medium) mb-8">
          Save your favorite products here and come back later.
        </p>
        <Link href="/products">
          <Button variant="filled" size="large">
            Browse products
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high)">
          Your Wishlist ({items.length})
        </h1>
        <Button variant="text" size="small" onClick={clearWishlist}>
          Clear all
        </Button>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            slug={item.slug}
            name={item.name}
            price={`$${item.price}`}
            image={item.image}
            // These fields are optional for the wishlist display
            inStock={true}
          />
        ))}
      </div>
    </Container>
  );
}

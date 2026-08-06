"use client";

import { Button } from "@/components/ui/button";
import { HeartIcon, HeartFilledIcon } from "@/components/icons";
import { useWishlist } from "@/providers/wishlist-provider";
import { Product } from "@/utils/interfaces";

export function WishlistToggle({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
  };

  return (
    <Button
      variant="text"
      size="icon-medium"
      className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 dark:bg-black/60 dark:hover:bg-black/80"
      onClick={handleToggle}
    >
      {inWishlist ? (
        <HeartFilledIcon className="size-6 text-red-500" />
      ) : (
        <HeartIcon className="size-6 text-(--on-bg-high)" />
      )}
    </Button>
  );
}

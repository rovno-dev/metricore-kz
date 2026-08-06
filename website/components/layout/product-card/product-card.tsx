"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HeartIcon, HeartFilledIcon } from "@/components/icons";
import { useWishlist } from "@/providers/wishlist-provider";
import { CSSProperties } from "react";

interface ProductCardProps {
  id?: string;
  slug?: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  image,
  description,
  rating,
  reviewCount,
  inStock = true,
  isNew = false,
  isSale = false,
  className,
  style,
}: ProductCardProps) {
  const productLink = id && slug ? `/products/${id}/${slug}` : null;
  const { toggleItem, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id || !slug) return;
    toggleItem({
      id,
      name,
      price: parseFloat(price.replace(/[^0-9.]/g, "")),
      image,
      slug,
    });
  };

  const inWishlist = id ? isInWishlist(id) : false;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-(--card) transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {/* Image area – clickable if link exists */}
      <div className="relative aspect-square w-full bg-(--bg-disabled) overflow-hidden">
        {productLink ? (
          <Link href={productLink} className="block w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {(isNew || isSale) && (
              <div className="absolute top-2 left-2 flex gap-1 pointer-events-none">
                {isNew && (
                  <Badge variant="filled-static" size="chip-small" className="text-[10px] uppercase tracking-wide">
                    New
                  </Badge>
                )}
                {isSale && (
                  <Badge variant="destructive" size="chip-small" className="text-[10px] uppercase tracking-wide">
                    Sale
                  </Badge>
                )}
              </div>
            )}
          </Link>
        ) : (
          <>
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {(isNew || isSale) && (
              <div className="absolute top-2 left-2 flex gap-1 pointer-events-none">
                {isNew && (
                  <Badge variant="filled-static" size="chip-small" className="text-[10px] uppercase tracking-wide">
                    New
                  </Badge>
                )}
                {isSale && (
                  <Badge variant="destructive" size="chip-small" className="text-[10px] uppercase tracking-wide">
                    Sale
                  </Badge>
                )}
              </div>
            )}
          </>
        )}

        {/* Wishlist button */}
        {id && slug && (
          <Button
            variant="text"
            size="icon-small"
            className="absolute top-2 right-2 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 dark:bg-black/60 dark:hover:bg-black/80"
            onClick={handleWishlistToggle}
          >
            {inWishlist ? (
              <HeartFilledIcon className="size-5 text-red-500" />
            ) : (
              <HeartIcon className="size-5 text-(--on-bg-high)" />
            )}
          </Button>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3">
        {/* Text content with flex-1 to push bottom section down */}
        <div className="flex-1">
          <h3 className="text-body-3 font-medium text-(--on-bg-high)">{name}</h3>
          {description && (
            <p className="text-body-5 text-(--on-bg-medium) line-clamp-2">{description}</p>
          )}
        </div>

        {/* Bottom section: price/rating + stock/button, always at bottom with min margin */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-display-5 text-(--on-bg-high) font-semibold">{price}</p>
            {rating !== undefined && (
              <div className="flex items-center gap-1 text-body-5 text-(--on-bg-medium)">
                <span className="text-(--primary)">★</span>
                <span>{rating.toFixed(1)}</span>
                {reviewCount !== undefined && (
                  <span className="text-(--on-bg-low)">({reviewCount})</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-body-6 text-(--on-bg-low)">
              {inStock ? "In stock" : "Sold out"}
            </span>
            <Button
              variant="text"
              size="chip-small"
              className="text-(--primary) hover:bg-(--primary-card)"
              disabled={!inStock}
            >
              {inStock ? "Add to cart" : "Notify me"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

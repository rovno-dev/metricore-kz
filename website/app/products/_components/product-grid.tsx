"use client";

import { ProductCard } from "@/components/layout/product-card/product-card";
import { Product } from "@/utils/interfaces";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-body-2 text-(--on-bg-medium)">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          slug={product.slug}
          name={product.name}
          price={`$${product.price}`}
          image={product.images[0]}
          description={product.description}
          rating={product.rating}
          reviewCount={product.reviewCount}
          inStock={product.inStock}
          isNew={product.isNew}
          isSale={product.isSale}
        />
      ))}
    </div>
  );
}

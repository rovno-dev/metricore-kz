"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/layout/product-card/product-card";

const products = [
  {
    name: "Unidoka Hoodie",
    price: "$45",
    image: "/_static/products/hoodie.png",
    description: "Organic cotton, embroidered logo, unisex fit.",
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    isNew: true,
  },
  {
    name: "Unidoka T-shirt",
    price: "$25",
    image: "/_static/products/t-shirt.png",
    description: "Ceramic, 12 oz, dishwasher safe.",
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
  },
  {
    name: "Unidoka watches",
    price: "$18",
    image: "/_static/products/watches.png",
    description: "Silver Watches",
    rating: 4.9,
    reviewCount: 12,
    inStock: false,
    isSale: true,
  },
  {
    name: "Unidoka Cap",
    price: "$32",
    image: "/_static/products/cap.png",
    description: "Wool blend, adjustable strap, embroidered.",
    rating: 4.3,
    reviewCount: 9,
    inStock: true,
    isNew: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="mb-10">
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high)">Best Sellers</h2>
          <p className="text-body-2 text-(--on-bg-medium) mt-2 max-w-xl">
            Our most‑loved gear, crafted for the AI era.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              {...product}
              className="animate-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
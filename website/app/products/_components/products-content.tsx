"use client";

import { useState, useMemo, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "./product-grid";
import { SortSelect } from "./sort-select";
import { FilterDrawer } from "./filter-drawer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Product } from "@/utils/interfaces";
import { getProducts } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton loader for product cards
function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between mt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "popularity">("popularity");

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const resetFilters = () => {
    setPriceRange([0, 50]);
    setSelectedColors([]);
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSortBy("popularity");
  };

  const filteredProducts = useMemo(() => {
    // Ensure products is an array
    if (!Array.isArray(products)) return [];
    let result = [...products];

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.size.some((s) => selectedSizes.includes(s))
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
      result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [products, priceRange, selectedColors, selectedTypes, selectedSizes, sortBy]);

  return (
    <ScrollReveal>
      <Container className="py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high)">
            All Products
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <SortSelect value={sortBy} onChange={setSortBy} />
            <FilterDrawer
              products={products}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              onReset={resetFilters}
            />
          </div>
        </div>

        <p className="text-body-4 text-(--on-bg-medium) mb-6">
          {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </Container>
    </ScrollReveal>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/interfaces";
import { getProducts } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function ProductSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
      <Skeleton className="h-12 w-12 rounded-md" />
      <div className="flex-1">
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container className="py-10 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high)">
          Products
        </h1>
        <Link href="/admin/products/new">
          <Button variant="filled" size="medium">Add Product</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.length === 0 ? (
            <Card className="p-8 text-center text-(--on-bg-medium)">
              No products found. Click "Add Product" to create one.
            </Card>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-(--on-bg-medium)">${product.price} • {product.status}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button variant="outlined" size="small">Edit</Button>
                  </Link>
                  <Button variant="destructive" size="small">Delete</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </Container>
  );
}

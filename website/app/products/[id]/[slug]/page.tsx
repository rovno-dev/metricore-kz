import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyboardArrowLeftIcon, HeartIcon } from "@/components/icons";
import { WishlistToggle } from "./_components/wishlist-toggle";
import { ProductGallery } from "./_components/product-gallery";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getProduct, productsData, getProducts } from "@/lib/api/products";
import { Product } from "@/utils/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/layout/product-card/product-card";
import { Metadata, ResolvingMetadata } from "next";

// Generate static params for all products
export async function generateStaticParams() {
  return productsData.map((product: Product) => ({
    id: product.id,
    slug: product.slug,
  }));
}

// Helper to get recommended products (same category, excluding current)
function getRecommendedProducts(currentProduct: Product, allProducts: Product[]): Product[] {
  return allProducts
    .filter(p => p.id !== currentProduct.id && p.type === currentProduct.type)
    .slice(0, 4);
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.name,
    description: product.description || `Shop ${product.name} at Unidoka UI.`,
    openGraph: {
      title: product.name,
      description: product.description || `Shop ${product.name} at Unidoka UI.`,
      url: `/products/${product.id}/${product.slug}`,
      images: [
        {
          url: product.images[0] || '/favicon.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  // Fetch all products for recommendations (we'll use the same data)
  const allProducts = await getProducts();
  const recommended = getRecommendedProducts(product, allProducts);

  // For reviews, we need to fetch users data (in a real app would be from DB)
  // For now we'll use mock users from JSON.
  const users = (await import("@/app/admin/users/data.json")).default;
  const reviewsWithAuthors = product.reviews?.map(review => ({
    ...review,
    author: users.find((u: any) => u.id === review.authorId)
  })) || [];

  return (
    <ScrollReveal>
      <Container className="py-10 md:py-12">
        {/* Breadcrumb / back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-body-4 text-(--on-bg-medium) hover:text-(--on-bg-high) transition-colors mb-6"
        >
          <KeyboardArrowLeftIcon className="size-4" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-display-2 md:text-display-1 text-(--on-bg-high) mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-display-4 text-(--on-bg-high) font-semibold">
                    ${product.price}
                  </p>
                  {product.isNew && (
                    <Badge variant="filled-static" size="chip-small">
                      New
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge variant="destructive" size="chip-small">
                      Sale
                    </Badge>
                  )}
                </div>
              </div>
              <WishlistToggle product={product} />
            </div>

            <p className="text-body-2 text-(--on-bg-medium) leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.size.map((size) => (
                <Badge key={size} variant="outlined-static" size="chip-small">
                  {size}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-body-4 text-(--on-bg-low)">
              <span>Color: {product.color}</span>
              <span className="w-px h-4 bg-(--outline)" />
              <span>Type: {product.type}</span>
              {product.rating && (
                <>
                  <span className="w-px h-4 bg-(--outline)" />
                  <span>
                    ★ {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="filled"
                size="large"
                className="flex-1"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to cart" : "Out of stock"}
              </Button>
              <Button variant="outlined" size="large">
                Add to wishlist
              </Button>
            </div>

            <div className="pt-4 text-body-4 text-(--on-bg-low)">
              {product.inStock ? (
                <span>✓ In stock</span>
              ) : (
                <span>✗ Out of stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviewsWithAuthors.length > 0 && (
          <div className="mt-16">
            <h2 className="text-display-3 text-(--on-bg-high) mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {reviewsWithAuthors.map((review, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-(--outline) bg-(--card)">
                  <Avatar className="size-10">
                    <AvatarImage src={review.author?.avatar} alt={review.author?.name} />
                    <AvatarFallback>{review.author?.name?.[0] || '?'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-(--on-bg-high)">{review.author?.name || 'Anonymous'}</span>
                      <span className="text-body-5 text-(--on-bg-low)">{review.rating} ★</span>
                    </div>
                    <h4 className="text-body-3 font-medium text-(--on-bg-high) mt-1">{review.headline}</h4>
                    <p className="text-body-4 text-(--on-bg-medium)">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Opportunities / Features section - can be static or dynamic. We'll show some highlights */}
        <div className="mt-16">
          <h2 className="text-display-3 text-(--on-bg-high) mb-6">Why you'll love it</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-(--outline) bg-(--card)">
              <div className="text-display-4 text-(--primary) mb-2">✦</div>
              <h3 className="text-body-3 font-medium text-(--on-bg-high)">Premium Materials</h3>
              <p className="text-body-5 text-(--on-bg-medium)">Crafted from high-quality, durable materials.</p>
            </div>
            <div className="p-6 rounded-xl border border-(--outline) bg-(--card)">
              <div className="text-display-4 text-(--primary) mb-2">★</div>
              <h3 className="text-body-3 font-medium text-(--on-bg-high)">Timeless Design</h3>
              <p className="text-body-5 text-(--on-bg-medium)">Minimalist aesthetic that fits any style.</p>
            </div>
            <div className="p-6 rounded-xl border border-(--outline) bg-(--card)">
              <div className="text-display-4 text-(--primary) mb-2">✓</div>
              <h3 className="text-body-3 font-medium text-(--on-bg-high)">Satisfaction Guaranteed</h3>
              <p className="text-body-5 text-(--on-bg-medium)">Love it or return it within 30 days.</p>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommended.length > 0 && (
          <div className="mt-16">
            <h2 className="text-display-3 text-(--on-bg-high) mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((recProduct) => (
                <ProductCard
                  key={recProduct.id}
                  id={recProduct.id}
                  slug={recProduct.slug}
                  name={recProduct.name}
                  price={`$${recProduct.price}`}
                  image={recProduct.images[0]}
                  description={recProduct.description}
                  rating={recProduct.rating}
                  reviewCount={recProduct.reviewCount}
                  inStock={recProduct.inStock}
                  isNew={recProduct.isNew}
                  isSale={recProduct.isSale}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </ScrollReveal>
  );
}

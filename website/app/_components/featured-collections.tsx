"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KeyboardArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const collections = [
  {
    title: "Summer Collection",
    description: "Lightweight tees, shorts, and caps for the sun.",
    image: "/_static/products/hoodie.png",
    isHero: true,
  },
  {
    title: "Premium Audio",
    description: "High‑fidelity headphones and speakers.",
    image: "/_static/products/hoodie.png",
    isHero: false,
  },
  {
    title: "Home Office",
    description: "Desk essentials for deep work.",
    image: "/_static/products/hoodie.png",
    isHero: false,
  },
  {
    title: "Watches",
    description: "Minimalist timepieces.",
    image: "/_static/products/hoodie.png",
    isHero: false,
  },
  {
    title: "Shoes",
    description: "Sneakers and loafers.",
    image: "/_static/products/hoodie.png",
    isHero: false,
  },
];

function CollectionCard({
  title,
  description,
  image,
  isHero,
}: (typeof collections)[0]) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-(--card) transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lg",
        isHero ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-square"
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={isHero ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 768px) 100vw, 45vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <h3 className={cn(
          "font-heading font-semibold",
          isHero ? "text-display-3 md:text-display-2" : "text-display-5"
        )}>
          {title}
        </h3>
        <p className={cn(
          "text-white/80",
          isHero ? "text-body-2 md:text-body-1" : "text-body-5"
        )}>
          {description}
        </p>
        <Badge
          variant="glass-static"
          size="chip-medium"
          className="mt-3 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
        >
          Explore
        </Badge>
      </div>
    </div>
  );
}

export function FeaturedCollections() {
  const hero = collections[0];
  const gridItems = collections.slice(1);

  return (
    <section className="py-8 md:py-10">
      <Container>
        <div className="mb-8">
          <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high)">Featured Collections</h2>
          <p className="text-body-2 text-(--on-bg-medium) mt-1 max-w-xl">
            Curated sets for every part of your day.
          </p>
        </div>

        {/* Hero Collection */}
        <div className="mb-3">
          <CollectionCard {...hero} />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {gridItems.map((item, index) => (
            <CollectionCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-8">
          <Button
            variant="glass"
            size="large"
            className="group rounded-full px-6"
          >
            <span>View all collections</span>
            <KeyboardArrowRightIcon className="size-3.5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

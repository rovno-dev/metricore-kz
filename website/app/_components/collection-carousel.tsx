"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";

const images = [
  { src: "/_static/products/cap.png", alt: "Cap" },
  { src: "/_static/products/headphones.png", alt: "Headphones" },
  { src: "/_static/products/hoodie.png", alt: "Hoodie" },
  { src: "/_static/products/t-shirt.png", alt: "T-shirt" },
  { src: "/_static/products/watches.png", alt: "Watches" },
];

const descriptions = [
  "The perfect accessory for any occasion.",
  "Immerse yourself in premium sound.",
  "Stay cozy and stylish.",
  "Classic comfort, modern design.",
  "Timeless elegance on your wrist.",
];

export function CollectionCarousel() {
  const [shuffled, setShuffled] = useState<typeof images>([]);

  useEffect(() => {
    // Shuffle images and assign random descriptions
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    const shuffledDescs = [...descriptions].sort(() => Math.random() - 0.5);
    const items = shuffledImages.map((img, i) => ({
      ...img,
      description: shuffledDescs[i % shuffledDescs.length],
    }));
    setShuffled(items);
  }, []);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-8">
          New Collection
        </h2>
        <Carousel
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent>
            {shuffled.map((item, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-(--bg-disabled)">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-medium">{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </Container>
    </section>
  );
}

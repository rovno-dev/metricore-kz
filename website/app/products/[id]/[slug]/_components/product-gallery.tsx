"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const autoplayPlugin = Autoplay({ delay: 3000, stopOnInteraction: true });

  return (
    <Carousel
      className="w-full"
      opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
      plugins={[autoplayPlugin]}
    >
      <CarouselContent>
        {images.map((src, idx) => (
          <CarouselItem key={idx}>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-(--bg-disabled)">
              <Image
                src={src}
                alt={`${name} - image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}

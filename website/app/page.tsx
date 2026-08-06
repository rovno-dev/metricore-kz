import { HeroSection } from "./_components/hero-section";
import { FeaturedProducts } from "./_components/featured-products";
import { TrustedBrands } from "./_components/trusted-brands";
import { FeaturedCollections } from "./_components/featured-collections";
import { ElementsShowcase } from "./_components/elements-showcase";
import { TypographyColorShowcase } from "./_components/typography-color-showcase";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CollectionCarousel } from "./_components/collection-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home - Premium E-commerce',
  description: 'Discover premium gear for builders, thinkers, and creators. Shop hoodies, mugs, notebooks, and more.',
};

export default function HomePage() {
  return (
    <>
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <FeaturedProducts />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <CollectionCarousel />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <TrustedBrands />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <FeaturedCollections />
      </ScrollReveal>
    </>
  );
}

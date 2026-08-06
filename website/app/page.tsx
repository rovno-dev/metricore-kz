import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HeroSection } from "./_components/hero-section";
import { ServicesSection } from "./_components/services-section";
import { StatsSection } from "./_components/stats-section";
import { CTAFormSection } from "./_components/cta-form-section";

export const metadata: Metadata = {
  title: 'Metricore | Агентство маркетинговой аналитики и стратегии',
  description: 'Помогаем бизнесу расти на основе данных. Веб-аналитика, маркетинговые воронки и Digital-стратегия с гарантией результата.',
  openGraph: {
    title: 'Metricore - Превращаем данные в стратегию роста',
    description: 'Внедряем аналитику и строим воронки продаж.',
    url: 'https://metricore.kz',
    siteName: 'Metricore',
    images: [{ url: '/favicon.png' }],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <ServicesSection />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <CTAFormSection />
      </ScrollReveal>
    </>
  );
}

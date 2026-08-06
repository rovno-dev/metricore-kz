import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyboardArrowRightIcon } from "@/components/icons";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[80dvh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-(--primary) opacity-[0.08] blur-3xl" />
        <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] rounded-full bg-(--brand-4) opacity-[0.05] blur-3xl" />
      </div>
      <Container className="relative z-10">
        <div className="max-w-3xl animate-reveal">
          <Badge variant="glass-static" size="chip-small" className="mb-6 px-4 py-1">
            Data-Driven Marketing Agency
          </Badge>
          <h1 className="text-display-1 md:text-display-0 font-heading font-bold mb-6 text-(--on-bg-high) leading-[1.05]">
            Превращаем данные в <span className="text-(--primary)">стратегию роста</span>
          </h1>
          <p className="text-body-1 text-(--on-bg-medium) mb-10 max-w-xl">
            Внедряем аналитику, строим воронки и разрабатываем цифровые стратегии, которые дают измеримый результат.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="large" shape="round">
              <a href="#cta" className="gap-2">
                <span>Оставить заявку</span>
                <KeyboardArrowRightIcon className="size-4" />
              </a>
            </Button>
            <Button variant="outlined" size="large" shape="round" asChild>
              <a href="#services">Наши услуги</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

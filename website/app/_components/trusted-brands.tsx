"use client";

import { Container } from "@/components/ui/container";
import { RovnoDevLogotypeMonochrome } from "@/components/icons/logotypes/rovno-dev-logotype-mono";
import { UnidokaLogotype } from "@/components/icons/logotypes/unidoka-logotype";
import { VershinyLogotypeMono } from "@/components/icons/logotypes/vershiny-logotype-mono";
import { useRef, useLayoutEffect, useState } from "react";

// Speed of the marquee in pixels per second
const MARQUEE_SPEED = 30;

export function TrustedBrands() {
  const logos = [
    <VershinyLogotypeMono color="var(--on-bg-medium)" key="vershiny" className="h-6! md:h-10! w-auto!" />,
    <RovnoDevLogotypeMonochrome color="var(--on-bg-medium)" key="rovno" className="h-6! md:h-10! w-auto!" />,
    <UnidokaLogotype color="var(--on-bg-medium)" key="unidoka" className="h-6! md:h-10! w-auto" />,
  ];
  // Duplicate for seamless loop
  const marqueeLogos = [...logos];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setShouldAnimate(false);
      return;
    }

    // Measure after layout is stable
    const measure = () => {
      const containerWidth = container.clientWidth;
      const trackWidth = track.scrollWidth / 2; // because we duplicated

      if (trackWidth > containerWidth) {
        const dur = trackWidth / MARQUEE_SPEED;
        setDuration(dur);
        setShouldAnimate(true);
      } else {
        setShouldAnimate(false);
        setDuration(null);
      }
    };

    // Use requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(measure);

    const handleResize = () => {
      requestAnimationFrame(measure);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-10 md:py-12 border-y border-(--outline)">
      <Container>
        <p className="text-body-5 text-(--on-bg-medium) text-center uppercase tracking-[0.15em] mb-6">
          Trusted by teams building the future
        </p>
        <div className="relative overflow-hidden" ref={containerRef}>
          <div
            ref={trackRef}
            className={`flex whitespace-nowrap ${!shouldAnimate ? "justify-center" : ""}`}
            style={
              shouldAnimate && duration !== null
                ? {
                  animation: `marquee ${duration}s linear infinite`,
                }
                : {}
            }
          >
            {marqueeLogos.map((logo, i) => (
              <div key={i} className="mx-6 md:mx-8 flex items-center justify-center">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

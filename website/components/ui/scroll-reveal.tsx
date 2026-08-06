"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // задержка в мс
  threshold?: number; // 0-1, процент видимости
  once?: boolean; // сработать только один раз
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Добавляем класс с задержкой
            setTimeout(() => {
              element.classList.add("is-visible");
            }, delay);
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            element.classList.remove("is-visible");
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  return (
    <div ref={ref} className={cn("scroll-reveal", className)}>
      {children}
    </div>
  );
}

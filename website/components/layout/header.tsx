"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../ui/container";
import { useTheme } from "@/providers/theme-provider";
import { SunIcon, NightIcon, SystemThemeIcon } from "../icons";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Услуги", href: "#services" },
    { name: "Результаты", href: "#stats" },
    { name: "Контакты", href: "#footer" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <Container className="pt-3">
        <div className="h-[56px] flex items-center justify-between rounded-5xl border border-white/20 bg-(--bg)/[0.65] backdrop-blur-[20px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-4 md:px-6">
          {/* Логотип — модный вектор */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <svg
              className="w-9 h-9 text-(--primary) transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Контур-подложка (символ дашборда) */}
              <rect
                x="1.5"
                y="1.5"
                width="29"
                height="29"
                rx="9"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.05"
              />
              {/* Буква M как ломаная линия графика */}
              <path
                d="M7 23 L11 13 L15 19 L19 10 L25 23"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Акцентная точка — метрика, с отступом от M */}
              <circle
                cx="21"
                cy="5.5"
                r="2"
                fill="currentColor"
              />
            </svg>
            <span className="hidden sm:block text-display-4 font-heading font-bold tracking-tighter text-(--on-bg-high)">
              METRICORE
            </span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-(--primary) transition-transform duration-300 group-hover:scale-150" />
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-4 font-medium text-(--on-bg-medium) hover:text-(--primary) transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="small"
              shape="round"
              className="!bg-(--primary) !text-white shadow-sm hover:shadow-md transition-all"
            >
              <a href="#cta">Оставить заявку</a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
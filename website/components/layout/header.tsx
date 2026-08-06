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

  // Ждём монтирования на клиенте, чтобы не было расхождения SSR и клиента
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
        {/* Стеклянная плавающая панель */}
        <div className="h-[56px] flex items-center justify-between rounded-5xl border border-white/20 bg-(--bg)/[0.65] backdrop-blur-[20px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-4 md:px-6">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-display-4 font-heading font-bold tracking-tighter text-(--on-bg-high)">
              METRICORE
            </span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-(--primary) transition-transform duration-300 group-hover:scale-150" />
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
            {/* Переключатель темы — рендерим только после монтирования */}
            {mounted && (
              <div className="flex items-center gap-1 rounded-full border border-(--outline) p-1">
                <button
                  onClick={() => setTheme("light")}
                  aria-label="Светлая тема"
                  className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                    theme === "light"
                      ? "bg-(--primary) text-white"
                      : "text-(--on-bg-low) hover:text-(--on-bg)"
                  }`}
                >
                  <SunIcon className="size-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  aria-label="Тёмная тема"
                  className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                    theme === "dark"
                      ? "bg-(--primary) text-white"
                      : "text-(--on-bg-low) hover:text-(--on-bg)"
                  }`}
                >
                  <NightIcon className="size-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  aria-label="Системная тема"
                  className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                    theme === "system"
                      ? "bg-(--primary) text-white"
                      : "text-(--on-bg-low) hover:text-(--on-bg)"
                  }`}
                >
                  <SystemThemeIcon className="size-4" />
                </button>
              </div>
            )}

            {/* Кнопка — рендерим всегда, она не зависит от темы */}
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
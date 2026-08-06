"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../ui/container";
import { useTheme } from "@/providers/theme-provider";
import { SunIcon, NightIcon, SystemThemeIcon } from "../icons";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Услуги", href: "#services" },
    { name: "Кейсы", href: "#cases" },
    { name: "Этапы", href: "#process" },
    { name: "Контакты", href: "#footer" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="w-full h-[64px] flex items-center border-b border-black/[0.06] bg-white/[0.8] px-4 md:px-6 backdrop-blur-[20px] dark:border-white/[0.08] dark:bg-black/[0.8]">
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-display-4 font-heading font-bold tracking-tighter text-(--on-bg-high)">METRICORE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-body-4 text-(--on-bg-medium) hover:text-(--primary) transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="filled" size="small" shape="round" className="hidden sm:flex">
              <a href="#cta">Оставить заявку</a>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

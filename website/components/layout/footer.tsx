import { Container } from "@/components/ui/container";
import { ThemeSwitcher } from "./theme-switcher";
import { TelegramLogotypeMonoIcon, VKLogotypeMonoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const links = [
  { name: "Услуги", href: "#services" },
  { name: "Результаты", href: "#stats" },
  { name: "Контакты", href: "#footer" },
];

export default function Footer() {
  return (
    <footer id="footer" className="pt-20 pb-8 border-t border-(--outline)">
      <Container>
        {/* Верх: бренд + навигация + переключатель темы */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">
          {/* Бренд */}
          <div className="max-w-sm">
            <span className="text-display-3 font-heading font-bold tracking-tighter block mb-3">
              METRICORE
            </span>
            <p className="text-body-4 text-(--on-bg-medium) leading-relaxed">
              Алматы, Казахстан. Работаем со всем миром. Внедряем культуру принятия решений на основе данных.
            </p>
          </div>

          {/* Навигация + контакты */}
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-body-4 text-(--on-bg-medium) hover:text-(--primary) transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@metricore.kz"
                className="text-body-4 text-(--on-bg-medium) hover:text-(--primary) transition-colors"
              >
                hello@metricore.kz
              </a>
              <a
                href="https://t.me/metricore"
                className="text-body-4 text-(--on-bg-medium) hover:text-(--primary) transition-colors"
              >
                @metricore
              </a>
            </div>
          </div>

          {/* Переключатель темы */}
          <ThemeSwitcher />
        </div>

        {/* Низ: копирайт + соцсети */}
        <div className="pt-6 border-t border-(--outline) flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-6 text-(--on-bg-low)">© 2026 Metricore Agency. Все права защищены.</p>
          <div className="flex gap-3">
            <Button variant="tonal-card" size="icon-small" asChild>
              <Link href="https://t.me/metricore" aria-label="Telegram">
                <TelegramLogotypeMonoIcon />
              </Link>
            </Button>
            <Button variant="tonal-card" size="icon-small" asChild>
              <Link href="#" aria-label="VK">
                <VKLogotypeMonoIcon />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
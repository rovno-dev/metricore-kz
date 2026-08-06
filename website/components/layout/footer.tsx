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
            <div className="flex items-center gap-2 mb-3">
              {/* Векторный логотип */}
              <svg
                className="w-9 h-9 text-(--primary)"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
                <path
                  d="M7 23 L11 13 L15 19 L19 10 L25 23"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle
                  cx="21"
                  cy="5.5"
                  r="2"
                  fill="currentColor"
                />
              </svg>
              <span className="text-display-3 font-heading font-bold tracking-tighter">
                METRICORE
              </span>
            </div>
            <p className="text-body-4 text-(--on-bg-medium) leading-relaxed">
              Алматы, Казахстан. Работаем со всем миром. Внедряем культуру принятия решений на основе данных.
            </p>
          </div>

          {/* Навигация + контакты */}
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <h4 className="text-body-4 font-semibold text-(--primary) mb-1">Навигация</h4>
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-body-4 text-(--on-bg-medium) hover:text-(--primary) transition-colors relative py-0.5 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-(--primary) transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <h4 className="text-body-4 font-semibold text-(--primary) mb-1">Контакты</h4>
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

        {/* Низ: копирайт + соцсети + ссылка на разработку */}
        <div className="pt-6 border-t border-(--outline) flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-body-6 text-(--on-bg-low)">© 2026 Metricore Agency. Все права защищены.</p>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-(--primary)" />
            <p className="text-body-6 text-(--on-bg-low)">
              Сделано в{" "}
              <Link
                href="https://rovno.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--primary) hover:underline underline-offset-2"
              >
                Rovno.dev
              </Link>
            </p>
          </div>
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
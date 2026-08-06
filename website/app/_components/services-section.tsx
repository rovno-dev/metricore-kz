import { Container } from "@/components/ui/container";
import { DeployedCodeIcon, ProgressActivityIcon, SearchIcon, PublicIcon, DesignServicesIcon } from "@/components/icons";

const services = [
  {
    title: "Веб-аналитика",
    description: "Настраиваем системы аналитики под ваш бизнес: от базовых отчётов до сложных событий и кастомных дашбордов.",
    icon: ProgressActivityIcon,
    accent: "var(--brand-6)",
    accentBg: "var(--brand-0)",
    accentBgDark: "var(--brand-2)",
    num: "01",
  },
  {
    title: "Маркетинговые воронки",
    description: "Проектируем и оптимизируем путь клиента от первого касания до повторной покупки.",
    icon: DeployedCodeIcon,
    accent: "var(--orange-6)",
    accentBg: "var(--orange-0)",
    accentBgDark: "var(--orange-2)",
    num: "02",
  },
  {
    title: "Анализ трафика",
    description: "Выявляем самые прибыльные каналы, отсекаем неэффективные расходы и перераспределяем бюджет.",
    icon: SearchIcon,
    accent: "var(--green-6)",
    accentBg: "var(--green-0)",
    accentBgDark: "var(--green-2)",
    num: "03",
  },
  {
    title: "Создание сайтов",
    description: "Создаём конверсионные посадочные страницы и интернет-магазины под ключ с фокусом на результат.",
    icon: DesignServicesIcon,
    accent: "var(--violet-6)",
    accentBg: "var(--violet-0)",
    accentBgDark: "var(--violet-2)",
    num: "04",
  },
  {
    title: "Digital-стратегия",
    description: "Разрабатываем комплексную стратегию продвижения с учётом KPI, ROI и долгосрочных целей бизнеса.",
    icon: PublicIcon,
    accent: "var(--teal-6)",
    accentBg: "var(--teal-0)",
    accentBgDark: "var(--teal-2)",
    num: "05",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28 overflow-hidden bg-[var(--bg)]">
      <style>{`
        .glass-service {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-service:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.06);
          border-color: rgba(0, 0, 0, 0.08);
        }
        .dark .glass-service:hover {
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .grid-bg-light {
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Иконки — яркий цвет, фон в тёмной теме спокойный */
        .service-icon {
          background-color: var(--service-accent-bg);
          color: var(--service-accent);
        }
        .dark .service-icon {
          background-color: var(--service-accent-bg-dark);
          color: var(--service-accent);
        }

        /* Принудительно красим иконки в текущий цвет */
        .service-icon svg * {
          fill: currentColor;
          stroke: currentColor;
        }

        /* Номера-водяные знаки */
        .watermark {
          opacity: 0.12;
        }
        .dark .watermark {
          opacity: 0.18;
        }
          .service-glow-brand {
  background: radial-gradient(circle, var(--brand-1) 0%, transparent 70%);
  opacity: 0.2;
}
.service-glow-teal {
  background: radial-gradient(circle, var(--teal-1) 0%, transparent 70%);
  opacity: 0.15;
}
.dark .service-glow-brand {
  opacity: 0.08;
}
.dark .service-glow-teal {
  opacity: 0.08;
}
      `}</style>

      {/* Фоновая сетка */}
      <div className="absolute inset-0 grid-bg-light pointer-events-none" />

      {/* Мягкое свечение */}
    {/* Мягкое свечение — приглушаем в тёмной теме */}
<div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none service-glow-brand" />
<div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none service-glow-teal" />

      <Container className="relative z-10">
        {/* Заголовок */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <span className="inline-block text-caption text-[var(--on-bg-low)] uppercase tracking-[0.2em] mb-3">
              Что делаем
            </span>
            <h2 className="text-display-2 lg:text-display-1 font-heading font-bold text-[var(--on-bg)] tracking-tight">
              Наши услуги
            </h2>
          </div>
          <p className="text-body-2 text-[var(--on-bg-medium)] max-w-md leading-relaxed lg:text-right">
            Комплексный подход к цифровому присутствию. Каждая услуга — с фокусом на измеримый результат.
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`
                  glass-service relative rounded-2xl p-8 lg:p-10 group cursor-default
                  ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
                `}
                style={{
                  "--service-accent": s.accent,
                  "--service-accent-bg": s.accentBg,
                  "--service-accent-bg-dark": s.accentBgDark,
                } as React.CSSProperties}
              >
                {/* Номер — водяной знак */}
                <span
                  className="watermark absolute top-4 right-6 text-[72px] lg:text-[88px] font-heading font-black leading-none select-none pointer-events-none"
                  style={{ color: s.accent }}
                >
                  {s.num}
                </span>

                {/* Цветная полоска слева при hover */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-16 rounded-r-full transition-all duration-500 ease-out"
                  style={{ backgroundColor: s.accent }}
                />

                {/* Иконка */}
                <div className="service-icon relative w-14 h-14 rounded-xl flex items-center justify-center mb-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="size-7" style={{ color: "var(--service-accent)" }} />
                </div>

                {/* Контент */}
                <h3 className="text-heading-3 font-sans font-semibold text-[var(--on-bg)] mb-3 relative">
                  {s.title}
                </h3>
                <p className="text-body-4 text-[var(--on-bg-medium)] leading-relaxed relative">
                  {s.description}
                </p>

                {/* Стрелка внизу */}
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-caption font-medium" style={{ color: s.accent }}>
                    Подробнее
                  </span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: s.accent }}>
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Нижний декор */}
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-[var(--outline)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-4)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--outline)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-4)]" />
          <div className="h-px w-16 bg-[var(--outline)]" />
        </div>
      </Container>
    </section>
  );
}
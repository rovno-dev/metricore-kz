import { Container } from "@/components/ui/container";

const steps = [
  { num: "01", text: "Обсуждаем задачи и KPI" },
  { num: "02", text: "Проводим аудит текущих данных" },
  { num: "03", text: "Готовим коммерческое предложение" },
];

export function CTAFormSection() {
  return (
    <section id="cta" className="relative py-29 overflow-hidden bg-[var(--bg)]">
      <style>{`
        .glass-form {
          background: var(--glass-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
        }
        /* Тёмная тема: светлый фон формы для читаемости текста Яндекса */
        .dark .glass-form {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        }
        .dark .glass-form .text-caption {
          color: var(--gray-6);
        }
        .dark .glass-form .border-b {
          border-color: var(--gray-2);
        }
        .dark .glass-form .border-t {
          border-color: var(--gray-2);
        }
        .grid-bg-light {
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Светло-синие свечения — единый класс */
        .cta-glow {
          background: radial-gradient(circle, var(--brand-1) 0%, transparent 70%);
          opacity: 0.2;
        }
        .dark .cta-glow {
          opacity: 0.06;
        }

        /* Тёмно-синяя рамка вокруг формы */
        .cta-ring {
          border-color: var(--primary);
          opacity: 0.25;
        }
        .dark .cta-ring {
          opacity: 0.15;
        }

        /* Анимация стрелки-подсказки при скролле */
        .scroll-hint {
          animation: scroll-hint 1.8s ease-in-out infinite;
        }
        @keyframes scroll-hint {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.7; }
          50% { transform: translate(-50%, 8px); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 grid-bg-light pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none -translate-y-1/2 cta-glow" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none cta-glow" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* Левая колонка */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block text-caption text-[var(--on-bg-low)] uppercase tracking-[0.2em] mb-4">
              Связаться
            </span>
            <h2 className="text-display-2 lg:text-display-1 font-heading font-bold text-[var(--on-bg)] tracking-tight mb-6">
              Готовы начать<br />проект?
            </h2>
            <p className="text-body-1 text-[var(--on-bg-medium)] mb-12 max-w-md leading-relaxed">
              Заполните форму, и мы свяжемся с вами в течение дня для обсуждения деталей и подготовки аудита.
            </p>

            <div className="relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-[var(--outline)]" />
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-5 group">
                    <div className="relative z-10 flex-shrink-0">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-bold text-sm transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: "var(--primary)", color: "var(--white)", boxShadow: "0 4px 16px color-mix(in srgb, var(--primary) 25%, transparent)" }}
                      >
                        {step.num}
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-body-2 text-[var(--on-bg)] font-medium">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[var(--outline)]">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="text-caption text-[var(--on-bg-low)]">Ответим в течение 24 часов</span>
              </div>
            </div>
          </div>

          {/* Правая колонка — форма со стеклом */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] border cta-ring pointer-events-none" />
            
            <div className="glass-form rounded-[2rem] overflow-hidden">
              {/* Шапка */}
              <div className="px-8 pt-5 pb-2.5 border-b border-[var(--outline)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--red-4)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--yellow-4)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-4)]" />
                </div>
                <span className="text-caption text-[var(--on-bg-low)]">Форма заявки</span>
              </div>

              {/* iframe — на телефоне во всю высоту без скролла,
                  на lg+ — скролл внутри + стрелка-подсказка */}
              <div
                className="relative p-3 lg:p-4 bg-transparent h-auto overflow-visible lg:h-[600px] lg:overflow-y-auto"
                style={{
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <iframe
                  src="https://forms.yandex.ru/cloud/6a7478fa505690096f0d3e17/?iframe=1"
                  name="ya-form-6a7478fa505690096f0d3e17"
                  width="100%"
                  frameBorder="0"
                  className="w-full h-[860px] lg:h-[900px] bg-transparent rounded-xl"
                />
                {/* Стрелка-подсказка только на lg+ */}
                <div
                  className="hidden lg:block absolute bottom-4 left-1/2 pointer-events-none scroll-hint"
                  style={{ color: 'var(--on-bg-low)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyboardArrowRightIcon } from "@/components/icons";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90dvh] flex items-center bg-[var(--bg)]">
      {/* CSS Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite 2s; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .text-gradient {
          background: linear-gradient(135deg, var(--brand-6) 0%, var(--brand-8) 50%, var(--brand-9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-card {
          position: relative;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }
        .dark .glass-card {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
        .dark .glass-card::before {
          background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
        }
        .grid-bg {
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-glow {
          background: radial-gradient(circle, var(--brand-3) 0%, transparent 70%);
          opacity: 0.2;
        }
        .dark .hero-glow {
          opacity: 0.08;
        }
        /* Декоративное кольцо — тёмно-синее, мягкое */
        .decor-ring {
          border-color: color-mix(in srgb, var(--primary) 30%, transparent);
        }
        .dark .decor-ring {
          border-color: color-mix(in srgb, var(--primary) 40%, transparent);
        }
      `}</style>

      {/* Background layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow — менее заметный в тёмной теме */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none hero-glow" />

      {/* Small glowing orbs — синие */}
      <div className="absolute top-[30%] left-[10%] w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse-glow" />
      <div className="absolute top-[60%] left-[25%] w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[30%] left-[15%] w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="max-w-2xl animate-slide-up">
            <Badge
              variant="glass-static"
              size="chip-small"
              className="mb-6 px-5 py-2 border border-[var(--primary)]/20 bg-[var(--brand-0)] text-[var(--primary)]"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
              </span>
              Маркетинг на основе данных
            </Badge>

            <h1 className="text-display-1 md:text-display-0 lg:text-[2.5rem] xl:text-[3.5rem] font-heading font-bold mb-6 leading-[1.05] text-gradient">
              Превращаем данные в стратегию роста
            </h1>

            <p className="text-body-1 text-[var(--on-bg-medium)] mb-10 max-w-xl leading-relaxed">
              Внедряем аналитику, строим воронки и разрабатываем цифровые стратегии, которые дают измеримый результат. Каждое решение — на основе реальных данных.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="large"
                shape="round"
                className="bg-[var(--primary)] hover:bg-[var(--brand-8)] text-white shadow-lg shadow-[var(--primary)]/25 transition-all hover:shadow-xl hover:shadow-[var(--primary)]/30"
              >
                <a href="#cta" className="gap-2">
                  <span>Оставить заявку</span>
                  <KeyboardArrowRightIcon className="size-4" />
                </a>
              </Button>

              <Button
                variant="outlined"
                size="large"
                shape="round"
                asChild
                className="border-[var(--outline)] text-[var(--on-bg)] hover:bg-[var(--surface)] hover:border-[var(--primary)]/40 transition-all"
              >
                <a href="#services">Наши услуги</a>
              </Button>
            </div>
          </div>

          {/* Right: Visual dashboard element */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full max-w-md">

              {/* Floating Node 1 - ROI (top right) */}
              <div className="absolute -top-4 -right-8 animate-float z-20">
                <div className="glass-card rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-0)] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--on-bg-low)] uppercase tracking-wider">ROI</div>
                      <div className="text-lg font-bold text-[var(--primary)]">+147%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Node 2 - CTR (middle far right) */}
              <div className="absolute top-[30%] -right-20 animate-float-delayed z-20">
                <div className="glass-card rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-0)] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--on-bg-low)] uppercase tracking-wider">CTR</div>
                      <div className="text-lg font-bold text-[var(--primary)]">4.8%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection lines — тёмно-синие */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ opacity: 0.15, overflow: 'visible' }}>
                <line x1="105%" y1="5%" x2="115%" y2="32%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="115%" y1="32%" x2="100%" y2="92%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Main glass card */}
              <div className="glass-card rounded-3xl p-6 shadow-lg relative overflow-hidden z-10">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--red-5)]" />
                    <div className="w-3 h-3 rounded-full bg-[var(--yellow-5)]" />
                    <div className="w-3 h-3 rounded-full bg-[var(--green-5)]" />
                  </div>
                  <div className="text-xs text-[var(--on-bg-low)]">Live Dashboard</div>
                </div>

                {/* Chart area — тёмно-синий */}
                <div className="relative h-40 mb-6">
                  <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q30,75 50,60 T100,50 T150,45 T200,30 T250,25 T300,15 L300,100 L0,100 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,80 Q30,75 50,60 T100,50 T150,45 T200,30 T250,25 T300,15"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                    />
                    {/* Data points */}
                    <circle cx="50" cy="60" r="3" fill="var(--primary)" />
                    <circle cx="100" cy="50" r="3" fill="var(--primary)" />
                    <circle cx="150" cy="45" r="3" fill="var(--primary)" />
                    <circle cx="200" cy="30" r="3" fill="var(--primary)" />
                    <circle cx="250" cy="25" r="3" fill="var(--primary)" />
                  </svg>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[var(--stat-bg)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--on-bg-low)] mb-1">Посетители</div>
                    <div className="text-sm font-bold text-[var(--on-bg)]">12.4K</div>
                    <div className="text-[10px] text-[var(--green-7)]">+12.5%</div>
                  </div>
                  <div className="bg-[var(--stat-bg)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--on-bg-low)] mb-1">Лиды</div>
                    <div className="text-sm font-bold text-[var(--on-bg)]">847</div>
                    <div className="text-[10px] text-[var(--green-7)]">+23.1%</div>
                  </div>
                  <div className="bg-[var(--stat-bg)] rounded-xl p-3">
                    <div className="text-[10px] text-[var(--on-bg-low)] mb-1">Продажи</div>
                    <div className="text-sm font-bold text-[var(--on-bg)]">₽2.4M</div>
                    <div className="text-[10px] text-[var(--green-7)]">+18.7%</div>
                  </div>
                </div>

                {/* Soft glow effect inside card */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ background: 'var(--brand-2)', opacity: 0.3 }}
                />
              </div>

              {/* Decorative ring — тёмно-синий */}
              <div className="absolute -inset-4 rounded-[2rem] border decor-ring pointer-events-none z-0" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
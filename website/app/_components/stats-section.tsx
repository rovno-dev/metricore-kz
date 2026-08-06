import { Container } from "@/components/ui/container";

const stats = [
  { value: "5+", label: "лет на рынке" },
  { value: "120+", label: "проектов" },
  { value: "3,2 млн ₽", label: "бюджет в управлении" },
  { value: "42%", label: "прирост конверсии" },
];

export function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--bg)]" id="stats">
      <style>{`
        @keyframes count-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-count {
          animation: count-up 0.6s ease-out forwards;
        }
        .glass-panel {
          background: var(--glass-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
        }
        .grid-bg-light {
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg-light pointer-events-none" />
      
      {/* Soft radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, var(--brand-2) 0%, transparent 70%)',
          opacity: 0.15 
        }}
      />

      <Container className="relative z-10">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="inline-block text-caption text-[var(--on-bg-low)] uppercase tracking-[0.2em] mb-4">
            Результаты в цифрах
          </span>
          <h2 className="text-display-2 font-heading font-bold text-[var(--on-bg)]">
            Метрики, которыми гордимся
          </h2>
        </div>

        {/* Glass panel */}
        <div className="glass-panel rounded-[2rem] p-2 lg:p-3 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div 
                key={i} 
                className={`
                  relative text-center py-10 lg:py-14 px-6 group cursor-default
                  ${i < stats.length - 1 ? 'lg:after:content-[""] lg:after:absolute lg:after:right-0 lg:after:top-1/4 lg:after:h-1/2 lg:after:w-px lg:after:bg-[var(--outline)]' : ''}
                `}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Accent dot — тёмно-синий */}
                <div 
                  className="w-2 h-2 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:scale-150"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                
                {/* Value — без акцента, обычный текст */}
                <p className="text-display-2 lg:text-display-1 font-heading font-bold text-[var(--on-bg)] mb-3 tracking-tight">
                  {s.value}
                </p>
                
                {/* Label — тёмно-синий */}
                <p className="text-body-3 font-medium uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                  {s.label}
                </p>

                {/* Hover indicator line — тёмно-синий */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-12 transition-all duration-300 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line — тёмно-синий акцент */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-[var(--outline)]" />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
          <div className="h-px w-16 bg-[var(--outline)]" />
        </div>
      </Container>
    </section>
  );
}
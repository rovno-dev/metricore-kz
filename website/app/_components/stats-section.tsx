import { Container } from "@/components/ui/container";

const stats = [
  { value: "5+", label: "лет на рынке" },
  { value: "120+", label: "проектов" },
  { value: "3,2 млн ₽", label: "бюджет в управлении" },
  { value: "42%", label: "прирост конверсии" },
];

export function StatsSection() {
  return (
    <section className="py-20 border-y border-(--outline)">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-display-2 font-heading font-bold text-(--primary) mb-2">{s.value}</p>
              <p className="text-body-4 text-(--on-bg-low) uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

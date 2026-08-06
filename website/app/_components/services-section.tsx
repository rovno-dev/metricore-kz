import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { DeployedCodeIcon, ProgressActivityIcon, SearchIcon, PublicIcon, DesignServicesIcon } from "@/components/icons";

const services = [
  {
    title: "Веб-аналитика",
    description: "Настраиваем системы аналитики под ваш бизнес: от базовых отчётов до сложных событий.",
    icon: <ProgressActivityIcon className="size-8 text-(--primary)" />,
  },
  {
    title: "Маркетинговые воронки",
    description: "Проектируем и оптимизируем путь клиента от первого касания до покупки.",
    icon: <DeployedCodeIcon className="size-8 text-(--primary)" />,
  },
  {
    title: "Анализ трафика",
    description: "Выявляем самые прибыльные каналы, отсекаем неэффективные расходы.",
    icon: <SearchIcon className="size-8 text-(--primary)" />,
  },
  {
    title: "Создание сайтов",
    description: "Создаём конверсионные посадочные страницы и интернет-магазины под ключ.",
    icon: <DesignServicesIcon className="size-8 text-(--primary)" />,
  },
  {
    title: "Digital-стратегия",
    description: "Разрабатываем комплексную стратегию продвижения с учётом KPI и ROI.",
    icon: <PublicIcon className="size-8 text-(--primary)" />,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-(--bg-disabled)/30">
      <Container>
        <div className="mb-16">
          <h2 className="text-display-2 font-heading font-bold mb-4">Наши услуги</h2>
          <p className="text-body-2 text-(--on-bg-medium) max-w-2xl">
            Комплексный подход к вашему цифровому присутствию.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card key={i} className="p-8 border-(--outline) bg-card hover:shadow-xl transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <h3 className="text-heading-3 mb-4">{s.title}</h3>
              <p className="text-body-4 text-(--on-bg-medium)">{s.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

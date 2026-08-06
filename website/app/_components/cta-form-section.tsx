import { Container } from "@/components/ui/container";

export function CTAFormSection() {
  return (
    <section id="cta" className="py-24 bg-card">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-display-2 font-heading font-bold mb-6 uppercase">Готовы начать проект?</h2>
            <p className="text-body-1 text-(--on-bg-medium) mb-8">
              Заполните форму, и мы свяжемся с вами в течение дня для обсуждения деталей.
            </p>
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-(--primary-card) flex items-center justify-center text-(--primary) font-bold">1</div>
                  <p className="text-body-3">Обсуждаем задачи и KPI</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-(--primary-card) flex items-center justify-center text-(--primary) font-bold">2</div>
                  <p className="text-body-3">Проводим аудит текущих данных</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-(--primary-card) flex items-center justify-center text-(--primary) font-bold">3</div>
                  <p className="text-body-3">Готовим коммерческое предложение</p>
               </div>
            </div>
          </div>
          <div className="bg-(--bg) rounded-3xl overflow-hidden border border-(--outline) shadow-2xl">
            <iframe 
              src="https://forms.yandex.ru/cloud/6a7478fa505690096f0d3e17/?iframe=1" 
              name="ya-form-6a7478fa505690096f0d3e17" 
              width="100%" 
              height="600"
              frameBorder="0"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
}

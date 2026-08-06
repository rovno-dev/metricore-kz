import { Container } from "@/components/ui/container";
import { ThemeSwitcher } from "./theme-switcher";
import { TelegramLogotypeMonoIcon, VKLogotypeMonoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-card pt-20 pb-10 border-t border-(--outline)">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <span className="text-display-3 font-heading font-bold mb-6 block">METRICORE</span>
            <p className="text-body-4 text-(--on-bg-medium) max-w-sm">
              Алматы, Казахстан. Работаем со всем миром. Внедряем культуру принятия решений на основе данных.
            </p>
          </div>
          <div>
            <h4 className="text-heading-6 mb-4 uppercase text-(--on-bg-low)">Контакты</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@metricore.kz" className="text-body-4 hover:text-(--primary)">hello@metricore.kz</a></li>
              <li><a href="https://t.me/metricore" className="text-body-4 hover:text-(--primary)">@metricore</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-heading-6 mb-4 uppercase text-(--on-bg-low)">Настройки</h4>
            <ThemeSwitcher />
          </div>
        </div>
        <div className="pt-8 border-t border-(--outline) flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-6 text-(--on-bg-low)">© 2026 Metricore Agency. Все права защищены.</p>
          <div className="flex gap-2">
             <Button variant="text" size="icon-small" asChild><Link href="#"><TelegramLogotypeMonoIcon /></Link></Button>
             <Button variant="text" size="icon-small" asChild><Link href="#"><VKLogotypeMonoIcon /></Link></Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

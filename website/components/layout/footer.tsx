import Link from "next/link";
import { Container } from "@/components/ui/container";
import Logotype from "./logotype/logotype";
import { ThemeSwitcher } from "./theme-switcher";
import {
  TelegramLogotypeMonoIcon,
  VKLogotypeMonoIcon,
  DprofileLogotypeMonoIcon,
  PinterestLogotypeMonoIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";

function SocialMediaIcons({ className }: { className?: string }) {
  const socialIcons = [
    { icon: <TelegramLogotypeMonoIcon />, href: "https://t.me/rovno_dev" },
    { icon: <VKLogotypeMonoIcon />, href: "https://vk.com/rovno_dev" },
    { icon: <DprofileLogotypeMonoIcon />, href: "https://dprofile.ru/rovno_dev" },
    { icon: <PinterestLogotypeMonoIcon />, href: "https://pinterest.com/rovno_dev" },
  ];

  return (
    <div className={className}>
      <div className="flex gap-1">
        {socialIcons.map((item, key) => (
          <Button variant="text" key={key} size="icon-large" asChild>
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              {item.icon}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-card pb-[100px] pt-[30px] sm:pt-[50px] border-t border-t-outline">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Top row: logotype + theme switcher + social */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logotype className="h-8 sm:h-10 w-auto" />
              <ThemeSwitcher />
            </div>
            <SocialMediaIcons className="" />
          </div>

          {/* Links grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-heading-3 text-(--on-bg-medium) mb-2">Company</h3>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link href="/about" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-heading-3 text-(--on-bg-medium) mb-2">Resources</h3>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link href="/docs" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/niyazgim/unidoka-ui-ui-template" target="_blank" rel="noopener noreferrer" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-heading-3 text-(--on-bg-medium) mb-2">Legal</h3>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link href="/privacy" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-heading-3 text-(--on-bg-medium) mb-2">Connect</h3>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link href="/contact" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-body-3 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          {/* Bottom: copyright */}
          <div className="pt-4 text-center text-body-5 text-(--on-bg-low)">
            © 2026 Niyaz Gimadiev with ❤️
          </div>
        </div>
      </Container>
    </footer>
  );
}
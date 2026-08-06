import "./globals.css";
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/providers/theme-provider";
import { WishlistProvider } from "@/providers/wishlist-provider";
import { AuthProvider } from "@/providers/auth-provider";
import BottomAppBar from "@/components/layout/bottom-app-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Import your fonts
export const NotoSans = localFont({
  src: '../public/fonts/NotoSans.woff2',
  variable: '--font-sans',
});

export const Oswald = localFont({
  src: '../public/fonts/Oswald.woff2',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Unidoka UI - Premium E-commerce',
    template: '%s | Unidoka UI',
  },
  description: 'Framework-agnostic, AI-driven design system based on shadcn. Modern e-commerce starter with Next.js, Tailwind, and Unidoka UI.',
  openGraph: {
    title: 'Unidoka UI',
    description: 'Premium e-commerce template with Unidoka UI design system.',
    url: '/',
    siteName: 'Unidoka UI',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unidoka UI',
    description: 'Premium e-commerce template with Unidoka UI design system.',
    images: ['/favicon.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(NotoSans.className, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (theme === 'system' && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-[100dvh]">
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              <WishlistProvider>
                <Header />
                <main className="flex-1 pt-[56px]">
                  {children}
                </main>
                <Footer />
                {/* <BottomAppBar /> */}
              </WishlistProvider>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html >
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logotype from "./logotype/logotype";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";
import { useWishlist } from "@/providers/wishlist-provider";
import { Container } from "../ui/container";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { items } = useWishlist();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="w-full h-[56px] flex items-center border-b border-black/[0.06] bg-white/[0.65] px-4 md:px-6 shadow-sm shadow-black/5 dark:shadow-white/5 backdrop-blur-[32px] dark:border-white/[0.08] dark:bg-black/[0.65] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0px_rgba(255,255,255,0.15)]">
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logotype className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="text"
              size="small"
              className="rounded-full px-4 text-sm font-medium text-neutral-700 hover:bg-white/20 dark:text-neutral-300 dark:hover:bg-white/10"
              onClick={() => router.push("/products")}
            >
              Products
            </Button>

            <Link href="/wishlist">
              <Button
                variant="text"
                size="icon-small"
                className="rounded-full relative"
              >
                <HeartIcon className="size-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="text" size="icon-small" className="rounded-full">
                    <Avatar className="size-8">
                      <AvatarFallback>
                        {user?.email?.[0]?.toUpperCase() || user?.phone?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="filled"
                  size="small"
                >
                  <Link href="/login">
                    Sign in
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="filled"
                  size="small"
                >
                  <Link href="/register">
                    Create account
                  </Link>
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-slate-border/60 bg-onyx/95 backdrop-blur-md"
          : "border-transparent bg-onyx/40 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Logo showTagline />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon focus-visible:ring-offset-2 focus-visible:ring-offset-onyx",
                pathname === link.href
                  ? "text-cyan-neon"
                  : "text-text-muted hover:text-text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" size="sm">
            {siteConfig.contact.formTitle}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-text-primary md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t divider-subtle bg-onyx/98 md:hidden"
          >
            <Container className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors",
                    pathname === link.href ? "text-cyan-neon" : "text-text-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-electric px-6 py-3 text-sm font-semibold text-onyx transition-colors hover:bg-cyan-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon"
              >
                {siteConfig.contact.formTitle}
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

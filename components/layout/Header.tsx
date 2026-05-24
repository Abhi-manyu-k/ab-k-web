"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-border/50 bg-onyx/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon focus-visible:ring-offset-2 focus-visible:ring-offset-onyx"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan-neon font-heading text-sm font-bold text-onyx transition-transform duration-300 group-hover:scale-105">
            AB
          </span>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-text-muted sm:block">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

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
            Book a Strategy Sync
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
            transition={{ duration: 0.25 }}
            className="border-t border-slate-border/50 bg-onyx/95 md:hidden"
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
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-electric to-cyan-neon px-6 py-3 text-sm font-semibold text-onyx transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon focus-visible:ring-offset-2 focus-visible:ring-offset-onyx"
              >
                Book a Strategy Sync
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

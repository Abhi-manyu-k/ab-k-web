"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,border-color] duration-300 sm:pl-5",
          scrolled || mobileOpen
            ? "border-line bg-ink/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors",
                  active ? "bg-ink-3 text-paper" : "text-muted hover:text-paper",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary hidden !py-2.5 !text-[0.8125rem] sm:inline-flex">
            {siteConfig.contact.formTitle}
            <ArrowUpRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-paper md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="log-in mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-ink/95 p-3 backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-baseline gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-ink-3",
                pathname === link.href ? "text-paper" : "text-muted",
              )}
            >
              <span className="font-mono text-[0.625rem] text-faint">0{i + 1}</span>
              <span className="serif text-2xl">{link.label}</span>
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary mt-2 w-full">
            {siteConfig.contact.formTitle}
          </Link>
        </nav>
      )}
    </header>
  );
}

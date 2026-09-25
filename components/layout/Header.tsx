"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b rule-ink bg-paper/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden h-full items-stretch md:flex" aria-label="Main navigation">
          {navLinks.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap border-l rule px-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors last:border-r lg:px-4 xl:px-5",
                  active ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2",
                )}
              >
                <span className={cn("text-[9px]", active ? "text-paper/50" : "text-faint")}>0{i + 1}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="btn btn-ink !hidden whitespace-nowrap !py-2.5 !shadow-none xl:!inline-flex">
          {siteConfig.contact.formTitle}
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="fade-up border-t rule-ink bg-paper md:hidden">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-baseline gap-4 border-b rule px-5 py-4",
                pathname === link.href ? "bg-ink text-paper" : "text-ink",
              )}
            >
              <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
              <span className="serif text-3xl">{link.label}</span>
            </Link>
          ))}
          <div className="p-5">
            <Link href="/contact" className="btn btn-ink w-full">
              {siteConfig.contact.formTitle}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

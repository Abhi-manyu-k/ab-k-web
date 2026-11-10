"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const mobileOpen = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpenOn(null), []);

  useEffect(() => {
    const nav = navRef.current;
    if (!mobileOpen) {
      // Focus must not be left on a link that has just become inert.
      if (nav && nav.contains(document.activeElement)) toggleRef.current?.focus();
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    // The menu only exists below md; leaving that width closes it (and releases the scroll lock).
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && close();

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b rule-ink bg-paper/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden h-full items-stretch md:flex" aria-label="Main navigation">
          {navLinks.map((link, i) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-cell flex items-center gap-1.5 whitespace-nowrap border-l rule px-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors last:border-r lg:px-4 xl:px-5",
                  active ? "bg-ink text-paper" : "text-ink-2",
                )}
              >
                <span className={cn("nav-idx text-[9px]", active ? "text-paper/70" : "text-muted")}>0{i + 1}</span>
                {link.label}
                {!active && <span aria-hidden="true" className="nav-bar" />}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          className="btn btn-ink btn-press !hidden whitespace-nowrap !py-2.5 !shadow-none lg:!inline-flex"
        >
          Contact
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setOpenOn(mobileOpen ? null : pathname)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <Menu
            aria-hidden="true"
            className={cn("menu-icon absolute h-5 w-5", mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100")}
          />
          <X
            aria-hidden="true"
            className={cn("menu-icon absolute h-5 w-5", mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")}
          />
        </button>
      </Container>

      <nav
        ref={navRef}
        id="mobile-nav"
        aria-label="Mobile navigation"
        inert={!mobileOpen}
        data-open={mobileOpen ? "" : undefined}
        className="mobile-nav absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t rule-ink bg-paper md:hidden"
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            style={{ "--i": i } as CSSProperties}
            className={cn(
              "mobile-nav-item flex items-baseline gap-4 border-b rule px-5 py-4",
              pathname === link.href ? "bg-ink text-paper" : "text-ink",
            )}
          >
            <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
            <span className="serif text-3xl">{link.label}</span>
          </Link>
        ))}
        <div className="mobile-nav-item p-5" style={{ "--i": navLinks.length } as CSSProperties}>
          <Link href="/contact" onClick={close} className="btn btn-ink w-full">
            Contact
          </Link>
        </div>
      </nav>

      <span aria-hidden="true" className="header-progress" />
    </header>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-border bg-slate-deep/50">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan-neon font-heading text-sm font-bold text-onyx">
                AB
              </span>
              <span className="font-heading text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-text-muted">{siteConfig.description}</p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-primary">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-cyan-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-primary">
              Contact
            </h3>
            <p className="mt-4 text-sm text-text-muted">
              Ready to move from passive pilots to active agentic systems?
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block text-sm font-medium text-cyan-neon transition-colors hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon"
            >
              {siteConfig.contactEmail}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Logo and founder bio: add before launch if available.
          </p>
        </div>
      </Container>
    </footer>
  );
}

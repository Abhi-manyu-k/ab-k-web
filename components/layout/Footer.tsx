import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-border bg-slate-deep/50">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
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
              {siteConfig.contact.email}
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-text-muted transition-colors hover:text-cyan-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-border pt-8 text-center">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

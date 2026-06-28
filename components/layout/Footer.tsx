import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t divider-subtle bg-slate-deep/50">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-text-muted">{siteConfig.description}</p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-amber-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-text-muted">
              Ready to deploy governed Virtual Employees in your organization?
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block text-sm font-medium text-amber-action transition-colors hover:text-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action"
            >
              {siteConfig.contact.formTitle}
            </Link>
            <Link
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-2 block text-sm text-text-muted transition-colors hover:text-amber-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action md:ml-auto md:w-fit"
            >
              {siteConfig.contact.email}
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-text-muted transition-colors hover:text-amber-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action md:ml-auto md:w-fit"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t divider-subtle pt-8">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t divider-subtle">
      <Container className="py-14 lg:py-18">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-muted">
              {siteConfig.description}
            </p>
            <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:text-right">
            <p className="mono-label mb-4">Get in touch</p>
            <Link
              href="/contact"
              className="block text-sm text-warm-white transition-colors hover:text-amber-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action"
            >
              {siteConfig.contact.formTitle}
            </Link>
            <Link
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-2 block text-sm text-text-muted transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action md:ml-auto md:w-fit"
            >
              {siteConfig.contact.email}
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-text-muted transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action md:ml-auto md:w-fit"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <hr className="hr-editorial my-10" />

        <p className="text-xs text-text-muted">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t hairline">
      <Container className="pt-16 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="label mb-5">Sitemap</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-5">Contact</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-paper link-underline">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-paper"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-live text-live animate-pulse-dot" />
                EU-hosted · GDPR-native
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t hairline py-6 text-xs text-faint sm:flex-row sm:justify-between">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.12em]">Built in Germany · Runs on your org chart</p>
        </div>
      </Container>

      <p
        aria-hidden="true"
        className="display pointer-events-none select-none whitespace-nowrap text-center text-[22vw] leading-[0.8] text-ink-3 -mb-[3vw]"
      >
        <em>Kinetics</em>
      </p>
    </footer>
  );
}

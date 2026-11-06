import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { legalLinks, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-10">
      <Container>
        <div className="border border-ink font-mono text-[11px] uppercase tracking-[0.08em]">
          <div className="grid lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="border-b border-ink p-6 lg:border-r lg:border-b-0">
              <Logo />
              <p className="mt-5 max-w-sm font-sans text-sm normal-case tracking-normal text-muted">
                Writing and talks by {siteConfig.author} on service AI and agent governance. Agents that act,
                governance that holds.
              </p>
            </div>

            <nav aria-label="Footer navigation" className="border-b border-ink p-6 lg:border-r lg:border-b-0">
              <p className="text-muted">Index</p>
              <ul className="mt-4 grid grid-cols-2 gap-y-2">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-ink hover:text-signal">
                      <span className="text-muted">0{i + 1}</span> {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="text-ink hover:text-signal">
                    <span className="text-muted">→</span> Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-6">
              <p className="text-muted">Contact</p>
              <ul className="mt-4 space-y-2 normal-case tracking-normal">
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="link text-ink">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-signal"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href="/rss.xml" className="text-ink hover:text-signal">
                    RSS ↗
                  </a>
                </li>
              </ul>
              <ul className="mt-6 flex gap-4 border-t border-dashed rule pt-4">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink hover:text-signal">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Title block */}
          <dl className="grid grid-cols-2 border-t border-ink sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["Author", siteConfig.author],
              ["Location", siteConfig.location],
              ["Writing as", siteConfig.name],
              ["Material", "Graphite on paper"],
              ["Rev.", String(year)],
              ["©", `${year} All rights reserved`],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-r border-ink px-4 py-3 last:border-r-0 lg:border-b-0">
                <dt className="text-[9px] text-muted">{k}</dt>
                <dd className="mt-0.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </footer>
  );
}

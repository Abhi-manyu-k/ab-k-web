import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SheetSwitch } from "@/components/ui/SheetSwitch";
import { XRayToggle } from "@/components/ui/XRay";
import { legalLinks, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-xray="Footer" className="pb-10">
      <Container>
        <div className="border-t rule font-mono text-[11px] uppercase tracking-[0.08em]">
          <div className="grid gap-10 py-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16 lg:py-14">
            <div>
              <Logo />
              <p className="mt-5 max-w-sm font-sans text-sm normal-case tracking-normal text-muted">
                Writing and talks by {siteConfig.author} on service AI and agent governance. Agents that act,
                governance that holds.
              </p>
            </div>

            <nav aria-label="Footer navigation">
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

            <div>
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
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t rule py-4">
          <dl className="flex flex-wrap gap-x-8 gap-y-2">
            {(
              [
                ["Author", siteConfig.author],
                ["Location", siteConfig.location],
                ["Writing as", siteConfig.name],
                ["Material", "Graphite on paper"],
                /* Colophon: the site is built the way the framework says agents should work. Agents write the
                   code, the author signs off every merge — "acts with approval", level L2. */
                [
                  "Built by",
                  <Link key="l2" href="/framework" className="hover:text-signal">
                    Agents at L2
                  </Link>,
                ],
                ["Approved", `${siteConfig.authorShort} · every merge`],
                ["Rev.", String(year)],
                ["©", `${year} All rights reserved`],
              ] as [string, React.ReactNode][]
            ).map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="text-[9px] text-muted">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <XRayToggle />
            <SheetSwitch />
          </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

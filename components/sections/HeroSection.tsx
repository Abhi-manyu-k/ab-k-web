import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LiveOrganigram } from "@/components/ui/LiveOrganigram";
import { marqueeItems } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow-signal pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 opacity-70"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <div>
              <p className="label mb-8 inline-flex items-center gap-3 rounded-full border hairline bg-ink-2/70 py-1.5 pl-2 pr-4">
                <span className="rounded-full bg-signal px-2 py-0.5 text-[0.5625rem] font-medium text-ink">New</span>
                Virtual Employees · made for German enterprise
              </p>

              <h1 className="display text-[3.4rem] sm:text-7xl lg:text-[6rem]">
                Your next hire
                <br />
                <em className="accent-italic">isn&apos;t human.</em>
              </h1>

              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                Governed AI teammates placed on your organigram — scoped to a department,
                wired into your systems, and accountable like any other employee.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  {siteConfig.contact.formTitle}
                  <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/services" className="btn btn-ghost">
                  See the platform
                </Link>
              </div>

              <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t hairline pt-6">
                {[
                  ["100+", "engineers served"],
                  ["EU", "hosted & routed"],
                  ["0", "vendor lock-in"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="serif text-3xl text-paper">{value}</dd>
                    <dd className="mt-1 text-xs text-faint">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <LiveOrganigram />
          </div>
        </Container>
      </section>

      <div className="marquee-mask overflow-hidden border-y hairline bg-ink-2/50 py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {marqueeItems.map((item) => (
                <li key={item} className="flex items-center gap-8 pr-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {item}
                  <span className="text-signal">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}

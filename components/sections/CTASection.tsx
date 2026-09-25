import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <div className="crop grid gap-12 border border-ink bg-paper-3 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:p-16">
            <div>
              <p className="note mb-6">Release for production</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
                Pick one machine. <em>One failure.</em> One quarter.
              </h2>
              <p className="lead mt-6 max-w-lg">
                A 30-minute call is enough to find the first agent worth building — and the controls it will
                need.
              </p>
            </div>

            <div className="flex flex-col justify-end">
              <dl className="font-mono text-[11px] uppercase tracking-[0.08em]">
                {[
                  ["Checked", "Scope & data"],
                  ["Approved", "Your name here"],
                  ["Date", "This week"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-end justify-between gap-4 border-b border-ink py-3">
                    <dt className="text-faint">{k}</dt>
                    <dd className="serif text-xl normal-case tracking-normal italic text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-ink">
                  {siteConfig.contact.formTitle}
                  <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <a href={`mailto:${siteConfig.contact.email}`} className="btn btn-line normal-case tracking-normal">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

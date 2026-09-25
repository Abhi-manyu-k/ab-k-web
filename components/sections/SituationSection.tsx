import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { RegulationTimeline } from "@/components/ui/RegulationTimeline";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { marketFacts } from "@/lib/content";

export function SituationSection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <SheetHeader
            sheet="02"
            label="The situation"
            title={
              <>
                Adopt agents. <em>Regulate them.</em> At the same time.
              </>
            }
            intro="European industry is being asked to do both at once. Most AI vendors only help with the first half. We were built for the overlap."
          />
        </FadeInOnScroll>

        <FadeInOnScroll>
          <dl className="mt-16 grid border-t border-l rule-ink sm:grid-cols-3">
            {marketFacts.map((f) => (
              <div key={f.label} className="border-r border-b rule-ink p-6 lg:p-8">
                <dd className="display text-7xl text-ink lg:text-8xl">{f.value}</dd>
                <dt className="mt-4 max-w-xs text-sm text-ink-2">{f.label}</dt>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-faint">Src: {f.source}</p>
              </div>
            ))}
          </dl>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
              <p className="note !text-ink">Revision table — AI on machines, 2026 → 2028</p>
              <Link href="/governance" className="note link !text-ink">
                Full timeline & what it means →
              </Link>
            </div>
            <RegulationTimeline compact />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <p className="mt-10 flex items-center gap-2 text-sm text-muted">
            <ArrowRight className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
            Not legal advice — we turn regulation into engineering controls, alongside your counsel.
          </p>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

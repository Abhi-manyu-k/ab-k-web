import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RegulationTimeline } from "@/components/ui/RegulationTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { Tbd } from "@/components/ui/Tbd";
import { marketFacts, regulationLastReviewed } from "@/lib/content";

const fmt = (d: string) => d.split("-").reverse().join(".");

export function SituationSection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <SheetHeader
          sheet="02"
          label="The situation"
          title={
            <>
              Adopt agents. <em>Regulate them.</em> At the same time.
            </>
          }
          intro="European industry is being asked to do both at once. Most AI tooling only helps with the first half. My work sits in the overlap."
        />

        {/* The cell lines hold still; each card's ink lands, card after card. */}
        <ul className="mt-16 grid border-t border-l rule-ink sm:grid-cols-3">
          {marketFacts.map((f, i) => (
            <Reveal as="li" stagger delay={i * 120} key={f.label} className="border-r border-b rule-ink p-6 lg:p-8">
              <p className="display text-7xl text-ink lg:text-8xl">{f.value}</p>
              <p className="mt-4 max-w-xs text-sm text-ink-2">{f.label}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                Src:{" "}
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
                    {f.source} ↗
                  </a>
                ) : (
                  f.source
                )}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20">
          <Reveal className="mb-6 grid border border-ink font-mono text-[10px] uppercase tracking-[0.08em] sm:grid-cols-[1fr_auto_auto]">
            <p className="px-4 py-2.5 text-ink">Revision table — AI on machines, 2026 → 2028</p>
            <p className="border-t border-ink px-4 py-2.5 sm:border-t-0 sm:border-l">
              <span className="text-muted">Last reviewed: </span>
              {regulationLastReviewed ? (
                <span className="text-ink">{fmt(regulationLastReviewed)}</span>
              ) : (
                <Tbd>date</Tbd>
              )}
            </p>
            <Link
              href="/governance"
              className="border-t border-ink px-4 py-2.5 text-ink transition-colors hover:bg-ink hover:text-paper sm:border-t-0 sm:border-l"
            >
              Full timeline →
            </Link>
          </Reveal>
          {/* The timeline draws itself on view. */}
          <RegulationTimeline compact />
        </div>

        <Reveal as="p" className="mt-10 flex items-center gap-2 text-sm text-muted">
          <ArrowRight className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
          Not legal advice — I write about turning regulation into engineering controls.
        </Reveal>
      </Container>
    </section>
  );
}

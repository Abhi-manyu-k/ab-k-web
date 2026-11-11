import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RegulationTimeline } from "@/components/ui/RegulationTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { SignalField } from "@/components/ui/SignalField";
import { Tbd } from "@/components/ui/Tbd";
import { marketFacts, regulationLastReviewed } from "@/lib/content";

const fmt = (d: string) => d.split("-").reverse().join(".");

export function SituationSection() {
  return (
    <section className="py-28 lg:py-44">
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

        {/* The hairlines hold still; each cell's ink lands, cell after cell. */}
        <ul className="mt-20 grid sm:grid-cols-3">
          {marketFacts.map((f, i) => (
            <Reveal
              as="li"
              stagger
              delay={i * 120}
              key={f.label}
              className="border-b rule py-8 first:pt-0 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:py-0 sm:first:pl-0 sm:last:border-r-0"
            >
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

        <Reveal className="mt-20">
          <SignalField
            variant="traces"
            className="h-[140px] sm:h-[200px]"
            caption="142 signals · 1 out of tolerance · corrected"
          />
        </Reveal>

        <div className="mt-20">
          <Reveal className="mb-6 flex items-baseline justify-between gap-4 border-b rule pb-3">
            <p className="note">Revision table — AI on machines, 2026 → 2028</p>
            <Link
              href="/governance"
              className="link shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink"
            >
              Full timeline →
            </Link>
          </Reveal>
          {/* The timeline draws itself on view. */}
          <RegulationTimeline compact />
        </div>

        <Reveal as="p" className="mt-10 flex items-center gap-2 text-sm text-muted">
          <ArrowRight className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
          <span>
            Not legal advice — I write about turning regulation into engineering controls.
            {" · "}
            <span className="font-mono text-[10px] uppercase tracking-[0.08em]">
              Last reviewed:{" "}
              {regulationLastReviewed ? (
                <span className="text-ink">{fmt(regulationLastReviewed)}</span>
              ) : (
                <Tbd>date</Tbd>
              )}
            </span>
          </span>
        </Reveal>
      </Container>
    </section>
  );
}

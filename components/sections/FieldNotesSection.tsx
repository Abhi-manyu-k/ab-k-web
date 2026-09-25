import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { caseStudies, fieldMetrics } from "@/lib/content";

export function FieldNotesSection() {
  const notes = caseStudies.slice(0, 3);

  return (
    <section className="plate py-20 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <SheetHeader
            sheet="05"
            label="Field notes"
            tone="plate"
            title={
              <>
                Built by someone who has <em>held the wrench.</em>
              </>
            }
            intro="Before agents, we trained engineers on the machines and fixed them on the shop floor. That's why our agents know what they're touching."
          />
        </FadeInOnScroll>

        <dl className="mt-16 grid border-t border-plate-line sm:grid-cols-3">
          {fieldMetrics.map((m, i) => (
            <FadeInOnScroll key={m.label} delay={i * 100}>
              <div className="border-b border-plate-line py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0">
                <dd className="display text-7xl text-paper lg:text-8xl">
                  <CountUp value={m.value} />
                </dd>
                <dt className="mt-4 max-w-xs text-sm text-paper/60">{m.label}</dt>
              </div>
            </FadeInOnScroll>
          ))}
        </dl>

        <div className="mt-16 grid gap-px bg-plate-line lg:grid-cols-3">
          {notes.map((n, i) => (
            <FadeInOnScroll key={n.id} delay={i * 100} className="h-full">
              <article className="flex h-full flex-col bg-plate p-6 lg:p-8">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em]">
                  <span className="text-faint">Note {String(i + 1).padStart(2, "0")}</span>
                  <span className={i === 1 ? "text-signal" : "text-paper/60"}>{n.tag}</span>
                </div>
                <h3 className="serif mt-10 text-3xl text-paper">{n.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-paper/60">{n.intervention}</p>
                <p className="mt-8 border-t border-plate-line pt-4 font-mono text-[11px] leading-relaxed text-paper">
                  → {n.impact}
                </p>
              </article>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll>
          <Link href="/case-studies" className="note link mt-10 inline-flex items-center gap-2 !text-paper">
            All field notes <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

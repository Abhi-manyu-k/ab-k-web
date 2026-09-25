import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonRows } from "@/lib/content";

export function ShiftSection() {
  return (
    <section className="py-24 lg:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FadeInOnScroll className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              index="01"
              eyebrow="The shift"
              title={
                <>
                  From tools
                  <br />
                  to <em className="accent-italic">teammates.</em>
                </>
              }
              description="Copilots wait to be asked. Virtual Employees hold a role, own outcomes, and answer to someone on your org chart."
            />
          </FadeInOnScroll>

          <FadeInOnScroll delay={120}>
            <div className="overflow-hidden rounded-2xl border hairline">
              <div className="grid grid-cols-2 border-b hairline bg-ink-2 sm:grid-cols-[0.8fr_1fr_1fr]">
                <span className="label hidden px-5 py-4 sm:block">&nbsp;</span>
                <span className="label px-5 py-4">Copilot</span>
                <span className="label border-l hairline bg-signal/5 px-5 py-4 !text-signal">Virtual Employee</span>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.dimension}
                  className="group grid grid-cols-2 border-b hairline last:border-b-0 sm:grid-cols-[0.8fr_1fr_1fr]"
                >
                  <span className="col-span-2 px-5 pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint sm:col-span-1 sm:py-6">
                    {row.dimension}
                  </span>
                  <span className="flex gap-2.5 px-5 py-4 text-sm text-faint sm:py-6">
                    <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{row.tool}</span>
                  </span>
                  <span className="flex gap-2.5 border-l hairline bg-signal/[0.03] px-5 py-4 text-sm text-paper transition-colors group-hover:bg-signal/[0.08] sm:py-6">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden="true" />
                    <span>{row.teammate}</span>
                  </span>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  );
}

import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { enterpriseUseCases, orgChart } from "@/lib/content";
import { cn } from "@/lib/utils";

const tilts = ["lg:-rotate-2", "lg:rotate-1 lg:translate-y-6", "lg:-rotate-1"];

export function RosterSection() {
  return (
    <section className="overflow-hidden py-24 lg:py-36">
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            index="03"
            eyebrow="The roster"
            align="center"
            title={
              <>
                Meet your <em className="accent-italic">new colleagues.</em>
              </>
            }
            description="Each Virtual Employee gets a department, a manager, and clearances — nothing more."
          />
        </FadeInOnScroll>

        <div className="mt-20 grid gap-8 md:grid-cols-3 lg:gap-10">
          {enterpriseUseCases.map((useCase, index) => {
            const code = orgChart.departments.find((d) => d.id === useCase.id)?.ve.code ?? "VE-0000";
            return (
              <FadeInOnScroll key={useCase.id} delay={index * 100}>
                <article
                  className={cn(
                    "relative mx-auto max-w-sm rounded-[1.5rem] border border-line bg-gradient-to-b from-ink-3 to-ink-2 p-6 transition-transform duration-500 hover:rotate-0 hover:-translate-y-2",
                    tilts[index],
                  )}
                >
                  {/* lanyard slot */}
                  <span className="mx-auto mb-6 block h-2 w-14 rounded-full bg-ink" aria-hidden="true" />

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-signal">
                        {useCase.department}
                      </p>
                      <p className="mt-1 font-mono text-[0.625rem] text-faint">ID {code}</p>
                    </div>
                    <div className="bg-dots flex h-14 w-14 items-center justify-center rounded-xl border hairline" aria-hidden="true">
                      <span className="serif text-2xl italic text-paper">VE</span>
                    </div>
                  </div>

                  <h3 className="serif mt-8 text-[2rem] leading-none text-paper">{useCase.title.replace("Virtual ", "")}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{useCase.description}</p>

                  <div className="mt-6 border-t border-dashed border-line-strong pt-5">
                    <p className="label mb-3 !text-[0.5625rem]">Clearances</p>
                    <ul className="space-y-1.5">
                      {useCase.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-2 text-sm text-paper">
                          <Check className="h-3.5 w-3.5 text-live" aria-hidden="true" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-live">
                      <span className="h-1.5 w-1.5 rounded-full bg-live text-live animate-pulse-dot" />
                      On shift
                    </span>
                    <span className="barcode w-24" aria-hidden="true" />
                  </div>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { caseStudies, fieldMetrics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Field notes",
  description:
    "Production AI service assistants, action-taking service agents, and research on troubleshooting agents and AI governance — field notes from AB Kinetics.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        sheet="04"
        eyebrow="Field notes"
        title={
          <>
            Shipped, tested, <em>published.</em>
          </>
        }
        description="Notes from production and research. Client names are withheld; details are available in a conversation."
      />

      <section className="py-16 lg:py-20">
        <Container>
          <dl className="grid border-t border-l border-ink sm:grid-cols-3">
            {fieldMetrics.map((m, i) => (
              <FadeInOnScroll key={m.label} delay={i * 100}>
                <div className="h-full border-r border-b border-ink p-6 lg:p-8">
                  <dd className="display text-7xl lg:text-8xl">
                    <CountUp value={m.value} />
                  </dd>
                  <dt className="mt-4 max-w-xs text-sm text-ink-2">{m.label}</dt>
                </div>
              </FadeInOnScroll>
            ))}
          </dl>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <ol className="border-t border-ink">
            {caseStudies.map((c, i) => (
              <FadeInOnScroll key={c.id}>
                <li className="grid gap-6 border-b border-ink py-12 lg:grid-cols-[5rem_1fr_1.3fr] lg:gap-12 lg:py-16">
                  <div className="flex items-baseline justify-between lg:block">
                    <span className="font-mono text-xs text-faint">N-{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`mt-2 inline-block border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${c.tag === "Now building" ? "border-signal text-signal" : "border-ink text-ink"}`}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <div>
                    <h2 className="serif text-4xl text-ink lg:text-5xl">{c.title}</h2>
                    <p className="mt-4 text-muted">{c.context}</p>
                  </div>
                  <div className="lg:pt-2">
                    <p className="note mb-2">Intervention</p>
                    <p className="text-ink-2">{c.intervention}</p>
                    <p className="mt-6 border-l-2 border-signal pl-4 serif text-2xl italic leading-snug text-ink">
                      {c.impact}
                    </p>
                  </div>
                </li>
              </FadeInOnScroll>
            ))}
          </ol>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

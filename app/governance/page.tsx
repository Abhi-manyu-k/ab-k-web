import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { RegulationTimeline } from "@/components/ui/RegulationTimeline";
import { AutonomyLadder } from "@/components/ui/AutonomyLadder";
import { CTASection } from "@/components/sections/CTASection";
import { governanceOffers, regulationBriefs, sources } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Governance",
  description:
    "AI Act, Machinery Regulation, Data Act and Cyber Resilience Act — turned into engineering controls for AI agents on machines and in the enterprise.",
};

export default function GovernancePage() {
  return (
    <>
      <PageHero
        sheet="03"
        eyebrow="AI governance for industry"
        title={
          <>
            Regulation, translated into <em>controls you can build.</em>
          </>
        }
        description="Four EU regulations now touch AI on machines. We turn them into autonomy levels, approval gates and audit trails — so compliance speeds agents up instead of freezing them."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <FadeInOnScroll>
            <SheetHeader
              sheet="01"
              label="Revision history"
              title={
                <>
                  The dates that <em>matter.</em>
                </>
              }
              intro="Reflects the Digital Omnibus on AI (Regulation (EU) 2026/1744), which deferred the high-risk deadlines. Status is calculated live from today's date."
            />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <div className="mt-14">
              <RegulationTimeline />
            </div>
          </FadeInOnScroll>
        </Container>
      </section>

      <section className="border-t rule-ink py-20 lg:py-28">
        <Container>
          <FadeInOnScroll>
            <SheetHeader
              sheet="02"
              label="Questions we get from machine builders"
              title={
                <>
                  Three questions, <em>straight answers.</em>
                </>
              }
            />
          </FadeInOnScroll>
          <div className="mt-14 grid gap-px border border-ink bg-ink lg:grid-cols-3">
            {regulationBriefs.map((b, i) => (
              <FadeInOnScroll key={b.instrument} delay={i * 100} className="h-full">
                <article className="flex h-full flex-col bg-paper p-6 lg:p-8">
                  <p className="note">
                    <span className="text-signal">Q{i + 1}</span> · {b.instrument}
                  </p>
                  <h3 className="serif mt-8 text-3xl text-ink">{b.question}</h3>
                  <p className="mt-4 text-ink-2">{b.answer}</p>
                </article>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mm border-t rule-ink py-20 lg:py-28">
        <Container>
          <FadeInOnScroll>
            <SheetHeader
              sheet="03"
              label="Our framework"
              title={
                <>
                  Autonomy, <em>by level.</em>
                </>
              }
              intro="The core of every governance engagement: decide how much an agent may do, then build exactly the controls that level requires — no more, no less."
            />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <div className="mt-24">
              <AutonomyLadder />
            </div>
          </FadeInOnScroll>
        </Container>
      </section>

      <section className="border-t rule-ink py-20 lg:py-28">
        <Container>
          <FadeInOnScroll>
            <SheetHeader
              sheet="04"
              label="Engagements"
              title={
                <>
                  Fixed scope. <em>Clear exit.</em>
                </>
              }
            />
          </FadeInOnScroll>
          <ul className="mt-14 border-t border-ink">
            {governanceOffers.map((o, i) => (
              <FadeInOnScroll key={o.title} delay={i * 60}>
                <li className="grid gap-3 border-b border-ink py-8 md:grid-cols-[4rem_1fr_1.4fr_8rem] md:items-baseline md:gap-8">
                  <span className="font-mono text-xs text-faint">G-0{i + 1}</span>
                  <h3 className="serif text-3xl text-ink lg:text-4xl">{o.title}</h3>
                  <p className="text-ink-2">{o.description}</p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-signal md:text-right">
                    {o.duration}
                  </span>
                </li>
              </FadeInOnScroll>
            ))}
          </ul>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <p className="text-sm text-muted">
              We are engineers, not lawyers. Our work turns regulation into technical and organisational
              controls, and we coordinate with your legal counsel and notified bodies where required.
            </p>
            <div>
              <p className="note mb-3">Sources</p>
              <ol className="space-y-1.5 text-sm">
                {sources.map((s, i) => (
                  <li key={s.href} className="flex gap-3">
                    <span className="font-mono text-[11px] text-faint">[{i + 1}]</span>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import {
  Briefcase,
  Layers,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { aboutPillars, founderBio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "AB Kinetics bridges C-suite strategy, software architecture, and physical operational reality—the vertical integration advantage.",
};

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Layers,
  Factory,
};

export default function AboutPage() {
  return (
    <>
      <section className="section-glow pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Our Edge"
            title="The Vertical Integration Advantage"
            description="Most AI consultancies stop at strategy decks or isolated demos. AB Kinetics connects the full stack—from boardroom intent to agentic architecture to shop-floor data—so your AI investments create durable operational leverage."
          />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {aboutPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] ?? Briefcase;
              return (
                <AnimatedCard key={pillar.title} delay={index * 0.1}>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-cyan-neon/20 text-cyan-neon">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-text-muted">{pillar.description}</p>
                </AnimatedCard>
              );
            })}
          </div>

          <AnimatedCard className="mt-10" delay={0.3}>
            <h3 className="font-heading text-2xl font-semibold text-text-primary">
              Why it matters
            </h3>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-muted">
              Agentic AI only delivers value when it can act on real data, respect governance
              constraints, and fit the operational context of your business. AB Kinetics does
              not only advise on AI strategy and does not only build isolated demos—we connect
              strategy, architecture, governance, data, tooling, and operational environments
              into systems your teams can run in production.
            </p>
          </AnimatedCard>
        </Container>
      </section>

      <section className="border-t border-slate-border bg-slate-deep/30 py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title={`Meet ${founderBio.name}`}
            description={founderBio.title}
            className="mb-10"
          />
          <AnimatedCard delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-text-muted">
              {founderBio.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </AnimatedCard>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

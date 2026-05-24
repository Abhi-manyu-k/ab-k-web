import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Representative engagements and proven impact from AB Kinetics—detailed references available in strategy conversations.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="section-glow pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Track Record"
            title="Proven Impact"
            description="Representative engagements across enterprise scale, production migration, agentic workflows, and industrial integration. Specific client references and metrics are available in a strategy conversation."
          />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-text-muted">
            Impact metrics marked for replacement should be updated with verified outcomes
            before public launch.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

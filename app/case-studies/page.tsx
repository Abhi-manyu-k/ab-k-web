import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CaseStudyMetrics } from "@/components/ui/CaseStudyMetrics";
import { CTASection } from "@/components/sections/CTASection";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Enterprise-scale impact from AB Kinetics—global rollouts, MCP standardization, and agentic orchestration at production scale.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="section-glow pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Track Record"
            title="Proven Impact"
            description="NDA-compliant summaries of enterprise-scale engagements. Detailed references and project specifics are available in a strategy conversation."
          />
        </Container>
      </section>

      <section className="pb-12 lg:pb-16">
        <Container>
          <CaseStudyMetrics />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

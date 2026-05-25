import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedCaseStudy } from "@/components/ui/FeaturedCaseStudy";
import { SupportingCaseStudy } from "@/components/ui/SupportingCaseStudy";
import { CaseStudyMetrics } from "@/components/ui/CaseStudyMetrics";
import { CTASection } from "@/components/sections/CTASection";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Enterprise-scale impact from AB Kinetics: global rollouts, MCP standardization, and agentic orchestration at production scale.",
};

export default function CaseStudiesPage() {
  const [featured, ...supporting] = caseStudies;

  return (
    <>
      <section className="border-b divider-subtle pt-32 pb-12 lg:pt-40 lg:pb-16">
        <Container>
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Track record"
              title="Proven impact"
              description="NDA-compliant summaries of enterprise-scale work. Detailed references are available in a strategy conversation."
            />
          </FadeInOnScroll>
        </Container>
      </section>

      <section className="pb-8 lg:pb-12">
        <Container>
          <CaseStudyMetrics />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container className="space-y-12 lg:space-y-16">
          <FeaturedCaseStudy study={featured} />
          <div className="grid gap-0 lg:grid-cols-3 lg:gap-12">
            {supporting.map((study) => (
              <SupportingCaseStudy key={study.id} study={study} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

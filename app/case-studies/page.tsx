import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero
        eyebrow="Track record"
        title={
          <>
            Shipped, not <em className="accent-italic">demoed.</em>
          </>
        }
        description="NDA-compliant summaries of enterprise-scale work. Detailed references are available in a strategy conversation."
      />

      <section className="border-b hairline">
        <Container>
          <CaseStudyMetrics />
        </Container>
      </section>

      <section className="py-20 lg:py-32">
        <Container className="space-y-20 lg:space-y-28">
          <FeaturedCaseStudy study={featured} />

          <div>
            <p className="label mb-8">More engagements</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {supporting.map((study, index) => (
                <SupportingCaseStudy key={study.id} study={study} index={index + 2} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceBlock } from "@/components/ui/ServiceBlock";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Platform & Services",
  description:
    "Enterprise AI strategy, agentic architecture, hardware/software integration, and production enablement from AB Kinetics.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform & services"
        title={
          <>
            Built for <em className="accent-italic">motion,</em> not slideware.
          </>
        }
        description="From executive alignment to production-grade agentic systems — clear milestones, governance, and technical depth at every stage."
      >
        <ol className="mt-12 flex flex-wrap gap-2">
          {services.map((service, i) => (
            <li key={service.id} className="rounded-full border hairline bg-ink-2/60 px-4 py-2 font-mono text-[0.6875rem] text-muted">
              <span className="text-signal">0{i + 1}</span> {service.title.split(" &")[0].split(" /")[0]}
            </li>
          ))}
        </ol>
      </PageHero>

      <section className="py-20 lg:py-32">
        <Container>
          {services.map((service, index) => (
            <ServiceBlock key={service.id} service={service} index={index} />
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}

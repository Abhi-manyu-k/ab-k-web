import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceBlock } from "@/components/ui/ServiceBlock";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Enterprise AI strategy, agentic architecture, hardware/software integration, and production enablement from AB Kinetics.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b divider-subtle pt-32 pb-20 lg:pt-44 lg:pb-28">
        <Container>
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Capabilities"
              title="Services built for motion"
              description="From executive alignment to production-grade agentic systems, with clear milestones, governance, and technical depth at each stage."
            />
          </FadeInOnScroll>
        </Container>
      </section>

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

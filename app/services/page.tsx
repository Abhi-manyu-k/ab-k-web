import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
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
      <section className="section-glow pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Services built for motion"
            description="From executive alignment to production-grade agentic systems—we help you move through each stage with clarity, governance, and technical depth."
          />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

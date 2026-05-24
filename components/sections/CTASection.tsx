import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="section-glow py-20 lg:py-28">
      <Container>
        <div className="glow-border rounded-3xl border border-slate-border bg-slate-card/40 p-10 text-center lg:p-16">
          <SectionHeading
            title="Accelerate Your AI Transition"
            description="Whether you're defining strategy, architecting agentic systems, or connecting operational data—let's map the path from passive experimentation to active leverage."
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              {siteConfig.contact.formTitle}
            </Button>
            <Button href="/case-studies" variant="secondary" size="lg">
              View Track Record
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

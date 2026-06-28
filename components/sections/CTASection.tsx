import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="border-t divider-subtle bg-slate-deep/30 py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <div className="card-trace surface-elevated mx-auto max-w-3xl px-8 py-12 text-center lg:px-14 lg:py-16">
            <SectionHeading
              title="Deploy Virtual Employees with confidence"
              description="Whether you're evaluating platform architecture, scoping a pilot department, or planning enterprise-wide rollout — we'll map a governed path from strategy to production."
              align="center"
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                {siteConfig.contact.formTitle}
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                {siteConfig.contact.secondaryCta}
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

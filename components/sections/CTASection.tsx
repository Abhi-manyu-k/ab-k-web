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
              title="Ready to move past the pilot?"
              description="Whether you're defining strategy, architecting agents, or wiring operational data, we'll map a path from experiment to production."
              align="center"
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                {siteConfig.contact.formTitle}
              </Button>
              <Button href="/case-studies" variant="secondary" size="lg">
                View track record
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

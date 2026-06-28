import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="border-t divider-subtle bg-slate-deep/30 py-16 lg:py-20">
      <Container>
        <FadeInOnScroll>
          <div className="card-trace surface-elevated mx-auto max-w-2xl px-8 py-10 text-center lg:px-12 lg:py-12">
            <SectionHeading
              title="Ready to deploy?"
              description="Book a demo. We'll map a governed path from pilot to production."
              align="center"
            />
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

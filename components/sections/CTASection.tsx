import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="border-t divider-subtle py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="serif-heading gradient-text text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem]">
              Ready to deploy?
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-text-muted">
              Book a demo. We&apos;ll map a governed path from pilot to production.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-warm-white transition-colors hover:text-amber-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action"
              >
                {siteConfig.contact.formTitle}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="link-underline text-sm text-text-muted transition-colors hover:text-warm-white"
              >
                {siteConfig.contact.email}
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] border hairline bg-ink-2 px-6 py-16 text-center sm:px-12 lg:py-24">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div
              className="glow-signal pointer-events-none absolute -bottom-40 left-1/2 h-[380px] w-[680px] -translate-x-1/2"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="label mb-6">Open position · Starts immediately</p>
              <h2 className="display mx-auto max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
                Hire your first <em className="accent-italic">Virtual Employee.</em>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-muted">
                A 30-minute call. We&apos;ll map one department, one role, and a governed path from pilot to
                production.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  {siteConfig.contact.formTitle}
                  <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={`mailto:${siteConfig.contact.email}`} className="btn btn-ghost">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

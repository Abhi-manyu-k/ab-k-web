import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroOrgChart } from "@/components/ui/HeroOrgChart";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-24 pb-20">
      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <FadeInOnScroll>
            <div className="max-w-2xl">
              <p className="mono-label mb-6 text-amber-action/80">Virtual Employees</p>

              <h1 className="serif-heading gradient-text text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1]">
                Governed AI teammates for German enterprises — on the organigram,
                not in a sidebar.
              </h1>

              <hr className="hr-editorial my-10 max-w-sm" />

              <p className="max-w-lg text-[1.0625rem] leading-relaxed text-text-muted">
                GDPR controls, model routing, deep workflow integration. From pilot
                to production with accountability built in.
              </p>

              <div className="mt-12 flex items-center gap-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-warm-white transition-colors hover:text-amber-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action"
                >
                  {siteConfig.contact.formTitle}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="link-underline text-sm text-text-muted transition-colors hover:text-warm-white"
                >
                  {siteConfig.contact.secondaryCta}
                </Link>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={300}>
            <HeroOrgChart />
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  );
}

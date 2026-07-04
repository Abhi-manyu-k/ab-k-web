import type { Metadata } from "next";
import Image from "next/image";
import {
  Briefcase,
  Layers,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { aboutPillars, founderBio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "AB Kinetics bridges C-suite strategy, software architecture, and physical operational reality. That vertical integration is our advantage.",
};

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Layers,
  Factory,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b divider-subtle pt-32 pb-20 lg:pt-44 lg:pb-28">
        <Container>
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="Our edge"
              title="The vertical integration advantage"
              description="Most AI consultancies stop at strategy decks or isolated demos. We connect boardroom intent to agentic architecture and shop-floor data so investments hold up in production."
            />
          </FadeInOnScroll>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <ol className="space-y-0">
            {aboutPillars.map((pillar) => {
              const Icon = iconMap[pillar.icon] ?? Briefcase;
              return (
                <li
                  key={pillar.title}
                  className="grid gap-6 border-t divider-subtle py-12 first:border-t-0 first:pt-0 lg:grid-cols-[auto_1fr] lg:gap-12 lg:py-16"
                >
                  <div className="flex items-start gap-4 text-text-muted pt-1">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="serif-heading text-2xl text-warm-white lg:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-text-muted">{pillar.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <hr className="hr-editorial my-16 lg:my-20" />

          <blockquote className="border-l border-slate-border/50 pl-6 lg:pl-10">
            <p className="serif-heading gradient-text text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem]">
              &ldquo;Agentic AI only pays off when it can act on real data, respect governance, and fit
              how your teams actually work, not when it lives in a demo sandbox.&rdquo;
            </p>
          </blockquote>
        </Container>
      </section>

      <section className="border-t divider-subtle py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[168px] shrink-0 overflow-hidden lg:mx-0 lg:max-w-[200px]">
              <Image
                src="/images/founder.jpg"
                alt={`Portrait of ${founderBio.name}, founder of AB Kinetics`}
                fill
                className="object-cover object-top grayscale"
                sizes="200px"
                priority
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Leadership"
                title={founderBio.name}
                description={founderBio.title}
                className="mb-10"
              />

              {founderBio.quote && (
                <p className="mb-8 serif-heading gradient-text text-xl lg:text-2xl">
                  {founderBio.quote}
                </p>
              )}

              <div className="space-y-5 text-[0.9375rem] leading-relaxed text-text-muted">
                {founderBio.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

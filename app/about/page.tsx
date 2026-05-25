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
      <section className="border-b divider-subtle pt-32 pb-12 lg:pt-40 lg:pb-16">
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

      <section className="pb-20 lg:pb-28">
        <Container>
          <ol className="space-y-0">
            {aboutPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] ?? Briefcase;
              return (
                <li
                  key={pillar.title}
                  className="grid gap-6 border-t divider-subtle py-10 first:border-t-0 first:pt-0 lg:grid-cols-[auto_1fr] lg:gap-12 lg:py-14"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-2xl font-bold tabular-nums text-amber-action/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-deep text-amber-action">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-text-primary lg:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-text-muted">{pillar.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <blockquote className="mt-16 border-l-2 border-amber-action/70 pl-6 lg:mt-20 lg:pl-8">
            <p className="font-heading text-lg font-medium leading-relaxed text-text-primary lg:text-xl">
              Agentic AI only pays off when it can act on real data, respect governance, and fit
              how your teams actually work, not when it lives in a demo sandbox.
            </p>
          </blockquote>
        </Container>
      </section>

      <section className="border-t divider-subtle bg-slate-deep/40 py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-14">
            <div className="relative mx-auto aspect-square w-full max-w-[168px] shrink-0 overflow-hidden rounded-xl bg-slate-card sm:max-w-[180px] lg:mx-0 lg:max-w-[200px]">
              <Image
                src="/images/founder.jpg"
                alt={`Portrait of ${founderBio.name}, founder of AB Kinetics`}
                fill
                className="object-cover object-top"
                sizes="200px"
                priority
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Leadership"
                title={founderBio.name}
                description={founderBio.title}
                className="mb-8"
              />

              {founderBio.quote && (
                <p className="mb-6 font-heading text-lg italic text-text-primary/90">
                  &ldquo;{founderBio.quote}&rdquo;
                </p>
              )}

              <div className="space-y-4 text-[0.9375rem] leading-relaxed text-text-muted">
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

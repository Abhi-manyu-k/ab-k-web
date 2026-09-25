import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, Layers, Factory, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { aboutPillars, founderBio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "AB Kinetics bridges C-suite strategy, software architecture, and physical operational reality. That vertical integration is our advantage.",
};

const iconMap: Record<string, LucideIcon> = { Briefcase, Layers, Factory };
const layerNames = ["Boardroom", "IDE", "Shop floor"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our edge"
        title={
          <>
            Boardroom to <em className="accent-italic">shop floor.</em>
          </>
        }
        description="Most AI consultancies stop at strategy decks or isolated demos. We connect boardroom intent to agentic architecture and shop-floor data so investments hold up in production."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {aboutPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] ?? Briefcase;
              return (
                <FadeInOnScroll key={pillar.title} delay={index * 100}>
                  <div className="panel group flex h-full flex-col p-7 transition-colors hover:border-line-strong">
                    <div className="flex items-center justify-between">
                      <span className="label">{layerNames[index]}</span>
                      <Icon className="h-5 w-5 text-faint transition-colors group-hover:text-signal" aria-hidden="true" />
                    </div>
                    <h2 className="serif mt-16 text-3xl text-paper">{pillar.title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>

          <FadeInOnScroll>
            <blockquote className="mx-auto mt-24 max-w-4xl text-center lg:mt-32">
              <p className="serif text-3xl leading-tight text-paper sm:text-4xl lg:text-5xl">
                &ldquo;Agentic AI only pays off when it can act on real data, respect governance, and fit how
                your teams <em className="accent-italic">actually work.</em>&rdquo;
              </p>
            </blockquote>
          </FadeInOnScroll>
        </Container>
      </section>

      <section className="border-t hairline py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
            <FadeInOnScroll>
              <figure className="panel mx-auto max-w-[280px] p-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="/images/founder.webp"
                    alt={`Portrait of ${founderBio.name}, founder of AB Kinetics`}
                    fill
                    className="object-cover object-top grayscale transition-[filter] duration-700 hover:grayscale-0"
                    sizes="280px"
                  />
                </div>
                <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                  <span>Founder</span>
                  <span>Aachen · Cambridge</span>
                </figcaption>
              </figure>
            </FadeInOnScroll>

            <FadeInOnScroll delay={100}>
              <p className="label mb-5">Leadership</p>
              <h2 className="serif text-5xl text-paper">{founderBio.name}</h2>
              <p className="mt-2 text-muted">{founderBio.title}</p>

              {founderBio.quote && (
                <p className="serif mt-10 border-l-2 border-signal pl-6 text-2xl italic leading-snug text-paper lg:text-3xl">
                  {founderBio.quote}
                </p>
              )}

              <div className="mt-10 max-w-2xl space-y-5 leading-relaxed text-muted">
                {founderBio.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

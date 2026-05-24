import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeTeasers } from "@/lib/content";

export function TeaserSections() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="End-to-end AI kinetics"
          description="We connect executive intent with technical execution and operational reality—so your AI investments create motion, not shelfware."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {homeTeasers.map((teaser, index) => (
            <AnimatedCard key={teaser.href} delay={index * 0.1} className="group flex flex-col">
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                {teaser.title}
              </h3>
              <p className="mt-3 flex-1 text-text-muted">{teaser.description}</p>
              <Link
                href={teaser.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-neon transition-all group-hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon"
              >
                {teaser.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { legacyExpertise } from "@/lib/content";

export function ProofSection() {
  return (
    <section className="border-t hairline py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeInOnScroll>
            <p className="label mb-5 flex items-center gap-3">
              <span className="text-signal">§04</span>
              {legacyExpertise.eyebrow}
            </p>
            <h2 className="serif text-4xl sm:text-5xl">{legacyExpertise.title}</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">{legacyExpertise.description}</p>
            <Link href="/case-studies" className="btn btn-ghost mt-10">
              Read the case studies
              <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </Link>
          </FadeInOnScroll>

          <dl className="grid content-start">
            {legacyExpertise.metrics.map((metric, index) => (
              <FadeInOnScroll key={metric.label} delay={index * 100}>
                <div className="flex items-baseline justify-between gap-6 border-b hairline py-7 first:pt-0">
                  <dt className="order-2 max-w-[12rem] text-right text-sm text-muted">{metric.label}</dt>
                  <dd className="display order-1 text-6xl text-paper sm:text-7xl">
                    <CountUp value={metric.value} />
                  </dd>
                </div>
              </FadeInOnScroll>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

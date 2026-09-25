import { caseStudyMetrics } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export function CaseStudyMetrics() {
  return (
    <div className="grid sm:grid-cols-3">
      {caseStudyMetrics.map((metric, index) => (
        <FadeInOnScroll key={metric.label} delay={index * 100}>
          <div className="h-full border-b hairline py-10 last:border-b-0 sm:border-b-0 sm:border-l sm:px-8 sm:py-14 sm:first:border-l-0 sm:first:pl-0">
            <p className="display text-6xl text-paper lg:text-7xl">
              <CountUp value={metric.value} />
            </p>
            <h3 className="mt-5 text-sm font-medium text-paper">{metric.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{metric.description}</p>
          </div>
        </FadeInOnScroll>
      ))}
    </div>
  );
}

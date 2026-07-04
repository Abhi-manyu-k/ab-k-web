"use client";

import { caseStudyMetrics } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export function CaseStudyMetrics() {
  return (
    <FadeInOnScroll>
      <div className="flex flex-col gap-10 py-16 sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:py-20">
        {caseStudyMetrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-1 flex-col sm:max-w-[300px] sm:border-l sm:border-slate-border/50 sm:pl-8 first:sm:border-l-0 first:sm:pl-0"
          >
            <p className="serif-heading gradient-text text-[2.5rem] sm:text-5xl">
              <CountUp value={metric.value} />
            </p>
            <h3 className="mt-4 font-heading text-base font-medium text-warm-white">
              {metric.label}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </FadeInOnScroll>
  );
}

"use client";

import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { caseStudyMetrics } from "@/lib/content";

export function CaseStudyMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {caseStudyMetrics.map((metric, index) => (
        <AnimatedCard key={metric.label} delay={index * 0.1} className="text-center md:text-left">
          <p className="font-heading text-4xl font-bold gradient-text">{metric.value}</p>
          <h3 className="mt-3 font-heading text-lg font-semibold text-text-primary">
            {metric.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{metric.description}</p>
        </AnimatedCard>
      ))}
    </div>
  );
}

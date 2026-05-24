import { caseStudyMetrics } from "@/lib/content";

export function CaseStudyMetrics() {
  return (
    <div className="flex flex-col gap-8 border-y divider-subtle py-10 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:py-12">
      {caseStudyMetrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-1 flex-col sm:max-w-[280px] sm:border-l sm:border-slate-border/50 sm:pl-6 first:sm:border-l-0 first:sm:pl-0"
        >
          <p className="font-heading text-3xl font-bold text-amber-action sm:text-4xl">
            {metric.value}
          </p>
          <h3 className="mt-2 font-heading text-sm font-semibold text-text-primary">
            {metric.label}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
            {metric.description}
          </p>
        </div>
      ))}
    </div>
  );
}

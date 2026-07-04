import { caseStudies } from "@/lib/content";

type CaseStudy = (typeof caseStudies)[number];

interface SupportingCaseStudyProps {
  study: CaseStudy;
}

export function SupportingCaseStudy({ study }: SupportingCaseStudyProps) {
  return (
    <article className="border-t divider-subtle pt-10 first:border-t-0 first:pt-0 lg:border-t-0 lg:pt-0">
      <h3 className="serif-heading text-xl text-warm-white">{study.title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">{study.context}</p>
      <div className="mt-6 border-l border-slate-border/50 pl-4">
        <span className="mono-label block mb-2">impact</span>
        <span className="text-[0.9375rem] leading-relaxed text-warm-white">{study.impact}</span>
      </div>
    </article>
  );
}

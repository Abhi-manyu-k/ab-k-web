import { caseStudies } from "@/lib/content";

type CaseStudy = (typeof caseStudies)[number];

interface SupportingCaseStudyProps {
  study: CaseStudy;
}

export function SupportingCaseStudy({ study }: SupportingCaseStudyProps) {
  return (
    <article className="border-t divider-subtle py-8 first:border-t-0 first:pt-0 lg:py-10">
      <h3 className="font-heading text-lg font-semibold text-text-primary">{study.title}</h3>
      <p className="mt-2 text-sm text-text-muted">{study.context}</p>
      <p className="mt-4 text-sm leading-relaxed text-text-primary">
        <span className="text-amber-action">Impact: </span>
        {study.impact}
      </p>
    </article>
  );
}

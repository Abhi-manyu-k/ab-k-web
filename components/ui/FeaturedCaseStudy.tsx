import { caseStudies } from "@/lib/content";

type CaseStudy = (typeof caseStudies)[number];

interface FeaturedCaseStudyProps {
  study: CaseStudy;
}

export function FeaturedCaseStudy({ study }: FeaturedCaseStudyProps) {
  return (
    <article className="surface-elevated p-8 lg:p-12">
      <span className="text-xs font-medium text-amber-action">Featured engagement</span>
      <h3 className="mt-3 font-heading text-2xl font-semibold text-text-primary lg:text-3xl">
        {study.title}
      </h3>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div>
          <p className="text-xs font-medium text-cyan-neon">Context</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{study.context}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-cyan-neon">Challenge</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{study.challenge}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-cyan-neon">Intervention</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{study.intervention}</p>
        </div>
        <div className="rounded-lg border-l-2 border-amber-action/60 pl-4 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-medium text-amber-action">Impact</p>
          <p className="mt-2 text-sm leading-relaxed text-text-primary">{study.impact}</p>
        </div>
      </div>
    </article>
  );
}

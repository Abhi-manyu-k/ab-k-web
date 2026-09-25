import { caseStudies } from "@/lib/content";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

type CaseStudy = (typeof caseStudies)[number];

interface SupportingCaseStudyProps {
  study: CaseStudy;
  index: number;
}

export function SupportingCaseStudy({ study, index }: SupportingCaseStudyProps) {
  return (
    <FadeInOnScroll delay={(index - 2) * 100} className="h-full">
      <article className="panel group flex h-full flex-col p-7 transition-colors hover:border-line-strong">
        <span className="font-mono text-xs text-faint transition-colors group-hover:text-signal">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="serif mt-8 text-2xl text-paper">{study.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{study.context}</p>
        <div className="mt-8 border-t border-dashed border-line-strong pt-5">
          <p className="label mb-2 !text-signal">Impact</p>
          <p className="text-sm leading-relaxed text-paper">{study.impact}</p>
        </div>
      </article>
    </FadeInOnScroll>
  );
}

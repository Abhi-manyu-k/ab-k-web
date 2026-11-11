import { Container } from "@/components/ui/Container";
import { SplitWords } from "@/components/ui/SplitWords";

interface PageHeroProps {
  /* Kept for the callers' API; the drawing number is no longer shown. */
  sheet: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  /** Optional quiet figure (e.g. a SignalField): right half on lg, under the description below. */
  figure?: React.ReactNode;
}

/*
 * On the bare sheet, no frame. On load (globals.css): the rule under the eyebrow draws left → right
 * (same rule as SheetHeader), the eyebrow fades in at 200ms, the title words land from 150ms, the
 * description rises at 450ms and the children at 550ms — done < 1.4s.
 */
export function PageHero({ eyebrow, title, description, children, figure }: PageHeroProps) {
  return (
    <section className="pt-24 pb-8 sm:pt-28">
      <Container>
        <div className="relative flex items-baseline gap-4 border-b border-transparent pb-3">
          <span className="note ph-eyebrow !text-ink">
            <span className="text-signal">●</span> {eyebrow}
          </span>
          <span aria-hidden="true" className="sheet-rule ph-rule bg-ink" />
        </div>
        <div className="pt-16 lg:pt-24">
          <h1 className="display ph-title max-w-5xl text-[3rem] sm:text-7xl lg:text-[6rem]">
            <SplitWords>{title}</SplitWords>
          </h1>
          {figure ? (
            <div className="grid lg:grid-cols-2 lg:gap-x-16">
              {description && <p className="lead ph-description mt-10 max-w-xl lg:col-start-1">{description}</p>}
              <div className="ph-children mt-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-12">{figure}</div>
              {children && <div className="ph-children lg:col-start-1">{children}</div>}
            </div>
          ) : (
            <>
              {description && <p className="lead ph-description mt-10 max-w-xl">{description}</p>}
              {children && <div className="ph-children">{children}</div>}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  sheet: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

export function PageHero({ sheet, eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="pt-24 sm:pt-28">
      <Container>
        <div className="frame bg-mm">
          <div className="flex items-center justify-between border-b rule-ink bg-paper px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em]">
            <span className="text-ink">
              <span className="text-signal">●</span> {eyebrow}
            </span>
            <span className="text-faint">Drawing no. ABK-{sheet}</span>
          </div>
          <div className="px-5 pt-16 pb-12 sm:px-10 lg:px-14 lg:pt-24 lg:pb-16">
            <h1 className="display max-w-5xl text-[3.25rem] sm:text-7xl lg:text-[7rem]">{title}</h1>
            {description && <p className="lead mt-10 max-w-xl bg-paper/80">{description}</p>}
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

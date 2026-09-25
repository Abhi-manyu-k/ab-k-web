import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b hairline pt-36 pb-16 lg:pt-48 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow-signal pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[520px] opacity-60"
        aria-hidden="true"
      />
      <Container className="relative">
        <p className="label mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          {eyebrow}
        </p>
        <h1 className="display max-w-4xl text-[3rem] sm:text-7xl lg:text-[5.5rem]">{title}</h1>
        {description && (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}

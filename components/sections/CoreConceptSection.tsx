import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { coreConceptPoints } from "@/lib/content";

export function CoreConceptSection() {
  return (
    <section className="border-t divider-subtle py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <p className="mono-label mb-6">The shift</p>
          <h2 className="serif-heading gradient-text text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] max-w-2xl">
            From tools to teammates
          </h2>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-text-muted">
            AI on the org chart — with roles, scoped access, and accountability.
          </p>
        </FadeInOnScroll>

        <hr className="hr-editorial my-12 lg:my-16" />

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {coreConceptPoints.map((point, index) => (
            <FadeInOnScroll key={point.title} delay={index * 100}>
              <div>
                <h3 className="font-heading text-base font-semibold text-warm-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {point.description}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

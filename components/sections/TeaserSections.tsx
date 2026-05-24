import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeTeasers } from "@/lib/content";
export function TeaserSections() {
  const [featured, ...rest] = homeTeasers;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="End-to-end AI kinetics"
          description="Executive intent, technical execution, and operational context, connected so investments create motion, not shelfware."
          className="mb-12 lg:mb-14"
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:grid-rows-2 lg:gap-5">
          <Link
            href={featured.href}
            className="group block lg:row-span-2"
          >
            <Card className="flex h-full min-h-[280px] flex-col justify-between transition-colors hover:bg-slate-card/90 lg:min-h-full">
              <div>
                <span className="text-xs font-medium text-amber-action">Featured</span>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-text-primary lg:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-md text-text-muted">{featured.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-neon transition-all group-hover:gap-3">
                {featured.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Card>
          </Link>

          {rest.map((teaser) => (
            <Link key={teaser.href} href={teaser.href} className="group block">
              <Card className="flex h-full flex-col justify-between transition-colors hover:bg-slate-card/90">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    {teaser.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{teaser.description}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-neon transition-all group-hover:gap-3">
                  {teaser.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

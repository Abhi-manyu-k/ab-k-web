import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeTeasers } from "@/lib/content";

export function TeaserSections() {
  const [featured, ...rest] = homeTeasers;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="What we do"
            title="End-to-end AI kinetics"
            description="Executive intent, technical execution, and operational context, connected so investments create motion, not shelfware."
            className="mb-12 lg:mb-14"
          />
        </FadeInOnScroll>

        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          <FadeInOnScroll className="lg:col-span-2 lg:row-span-2">
            <Link href={featured.href} className="group block h-full">
              <Card className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-0 lg:min-h-full">
                <div className="absolute inset-0">
                  <Image
                    src="/images/rag-whiteboard.png"
                    alt=""
                    fill
                    className="object-cover object-top opacity-20"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-card via-slate-card/90 to-slate-card/70" />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
                  <div>
                    <span className="text-xs font-medium text-amber-action">Featured</span>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-text-primary lg:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="mt-4 max-w-md text-text-muted">{featured.description}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-action transition-all group-hover:gap-3">
                    {featured.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Card>
            </Link>
          </FadeInOnScroll>

          {rest.map((teaser, index) => (
            <FadeInOnScroll key={teaser.href} delay={(index + 1) * 80}>
              <Link href={teaser.href} className="group block h-full">
                <Card className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary">
                      {teaser.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">{teaser.description}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-action transition-all group-hover:gap-3">
                    {teaser.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { CTASection } from "@/components/sections/CTASection";
import { aboutPillars, careerRoute, credentials, founderBio } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "AB Kinetics connects boardroom, IDE, shop floor and rulebook — founded by an engineer who builds service agents for semiconductor equipment.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        sheet="05"
        eyebrow="About"
        title={
          <>
            Boardroom, IDE, shop floor, <em>rulebook.</em>
          </>
        }
        description="Most AI consultancies cover one of these. Agents that touch real machines need all four — so that's how we're built."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid border-t border-l border-ink sm:grid-cols-2 lg:grid-cols-4">
            {aboutPillars.map((p, i) => (
              <FadeInOnScroll key={p.zone} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col border-r border-b border-ink p-6 lg:p-8">
                  <p className="note flex justify-between">
                    <span>Zone {String.fromCharCode(65 + i)}</span>
                    <span className="text-ink">{p.zone}</span>
                  </p>
                  <h2 className="serif mt-16 text-3xl text-ink">{p.title}</h2>
                  <p className="mt-3 text-sm text-ink-2">{p.description}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t rule-ink py-20 lg:py-28">
        <Container>
          <FadeInOnScroll>
            <SheetHeader
              sheet="02"
              label="Founder"
              title={founderBio.name}
              intro={founderBio.title}
            />
          </FadeInOnScroll>

          <div className="mt-14 grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
            <FadeInOnScroll>
              <figure className="border border-ink bg-paper-3 p-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/founder.webp"
                    alt={`Portrait of ${founderBio.name}, founder of AB Kinetics`}
                    fill
                    sizes="300px"
                    className="object-cover object-top grayscale contrast-110 mix-blend-multiply"
                  />
                </div>
                <figcaption className="flex justify-between px-1 pt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  <span>Fig. — Founder</span>
                  <span>Aachen</span>
                </figcaption>
              </figure>
            </FadeInOnScroll>

            <FadeInOnScroll delay={100}>
              <p className="serif text-3xl italic leading-snug text-ink lg:text-4xl">&ldquo;{founderBio.quote}&rdquo;</p>
              <div className="mt-10 max-w-2xl space-y-5 text-ink-2">
                {founderBio.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <ul className="mt-10 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <li key={c} className="border border-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">
                    {c}
                  </li>
                ))}
              </ul>
            </FadeInOnScroll>
          </div>
        </Container>
      </section>

      <section className="bg-mm border-t rule-ink py-20 lg:py-28">
        <Container>
          <FadeInOnScroll>
            <SheetHeader
              sheet="03"
              label="Process route"
              title={
                <>
                  Every station <em>left a tool.</em>
                </>
              }
              intro="Batteries taught safety margins. Logistics taught KPIs. Training taught how engineers actually learn. Research taught rigour. Production taught everything else."
            />
          </FadeInOnScroll>
          <FadeInOnScroll>
            <ol className="relative mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-7">
              {careerRoute.map((s, i) => {
                const last = i === careerRoute.length - 1;
                return (
                  <li key={s.year + s.place} className="relative border-l border-ink bg-paper py-2 pl-5 pr-3 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
                    <span
                      className={`absolute -left-[5px] top-3 h-2.5 w-2.5 rotate-45 border border-ink lg:-top-[5px] lg:left-0 ${last ? "bg-signal border-signal" : "bg-paper"}`}
                    />
                    <span className={`font-mono text-xs ${last ? "text-signal" : "text-faint"}`}>{s.year}</span>
                    <span className="serif mt-2 block text-xl leading-tight text-ink">{s.place}</span>
                    <span className="mt-1 block pb-4 text-sm text-muted">{s.role}</span>
                  </li>
                );
              })}
            </ol>
          </FadeInOnScroll>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { CTASection } from "@/components/sections/CTASection";
import { aboutPillars, careerRoute, credentials, founderBio } from "@/lib/content";
import { siteConfig } from "@/lib/site";

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
              label="Drawn by"
              title={
                <>
                  An engineer <em>first.</em>
                </>
              }
              intro="AB Kinetics is a small, senior practice. The person scoping your agent is the person who has built them — and serviced the machines they run on."
            />
          </FadeInOnScroll>

          <FadeInOnScroll>
            <dl className="mt-14 grid grid-cols-[auto_1fr] border border-ink font-mono text-[11px] uppercase tracking-[0.08em] sm:grid-cols-[auto_1fr_1fr_1fr]">
              <div className="row-span-2 border-r border-ink p-2 sm:row-span-1">
                <Image
                  src="/images/founder.webp"
                  alt={`Portrait of ${founderBio.name}`}
                  width={72}
                  height={88}
                  className="h-[88px] w-[72px] object-cover object-top grayscale contrast-110 mix-blend-multiply"
                />
              </div>
              <div className="border-b border-ink px-4 py-3 sm:border-b-0 sm:border-r">
                <dt className="text-[9px] text-faint">Drawn by</dt>
                <dd className="mt-1 text-ink">{founderBio.name}</dd>
              </div>
              <div className="px-4 py-3 sm:border-r sm:border-ink">
                <dt className="text-[9px] text-faint">Role</dt>
                <dd className="mt-1 normal-case tracking-normal text-ink">{founderBio.title}</dd>
              </div>
              <div className="col-span-2 border-t border-ink px-4 py-3 sm:col-span-1 sm:border-t-0">
                <dt className="text-[9px] text-faint">Contact</dt>
                <dd className="mt-1 normal-case tracking-normal">
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="link text-ink">
                    LinkedIn ↗
                  </a>
                </dd>
              </div>
            </dl>
          </FadeInOnScroll>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <FadeInOnScroll>
              <p className="serif text-3xl leading-snug text-ink lg:text-4xl">
                <em>&ldquo;{founderBio.quote}&rdquo;</em>
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll delay={100}>
              <div className="space-y-5 text-ink-2">
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

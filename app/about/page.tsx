import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SheetHeader } from "@/components/ui/SheetHeader";
import { CTASection } from "@/components/sections/CTASection";
import { TrackRecordSection } from "@/components/sections/TrackRecordSection";
import { aboutPillars, authorBio, careerRoute, credentials } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  ogTitle: "About Abhimanyu Kanwar — engineer, service AI & agent governance",
  description:
    "I'm Abhimanyu Kanwar, an engineer from Aachen working on service AI for semiconductor equipment. Boardroom, IDE, shop floor and rulebook: how I got here and what I work on.",
  path: "/about",
  type: "profile",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author,
  jobTitle: authorBio.title,
  url: `${siteConfig.url}/about`,
  image: `${siteConfig.url}/images/founder.webp`,
  homeLocation: { "@type": "Place", name: siteConfig.location },
  // Cambridge was a visiting stay for the master thesis, so it is not listed as a degree.
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "RWTH Aachen University", sameAs: "https://www.rwth-aachen.de" }],
  knowsAbout: ["AI agents", "AI governance", "EU AI Act", "Field service", "Semiconductor equipment"],
  sameAs: [siteConfig.links.linkedin],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <PageHero
        sheet="05"
        eyebrow="About"
        title={
          <>
            Boardroom, IDE, shop floor, <em>rulebook.</em>
          </>
        }
        description="Agents that touch real machines need all four. I have worked in each of them — that is what I write and speak from."
      />

      <section className="py-20 lg:py-28">
        <Container>
          {/* First block below the hero: four columns between hairlines, each zone's ink lands in turn. */}
          <div className="grid gap-y-8 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4 lg:gap-y-0">
            {aboutPillars.map((p, i) => (
              <Reveal
                stagger
                delay={i * 120}
                key={p.zone}
                className={`rule flex h-full flex-col ${i > 0 ? "border-t pt-8 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"} ${i === aboutPillars.length - 1 ? "lg:pr-0" : "lg:pr-8"}`}
              >
                <p className="note flex justify-between">
                  <span>Zone {String.fromCharCode(65 + i)}</span>
                  <span className="text-ink">{p.zone}</span>
                </p>
                <h2 className="serif mt-16 text-3xl text-ink">{p.title}</h2>
                <p className="mt-3 text-sm text-ink-2">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t rule py-20 lg:py-28">
        <Container>
          <SheetHeader
            sheet="02"
            label="Drawn by"
            title={
              <>
                An engineer <em>first.</em>
              </>
            }
            intro="I write about agents I have built, for machines I have serviced. AB Kinetics is the name I publish under."
          />

          <Reveal>
            <dl className="mt-14 grid grid-cols-[auto_1fr] font-mono text-[11px] uppercase tracking-[0.08em] sm:grid-cols-[auto_1fr_1fr_1fr]">
              <div className="rule row-span-2 border-r py-2 pr-4 sm:row-span-1">
                <dt className="sr-only">Portrait</dt>
                <dd>
                <Image
                  src="/images/founder.webp"
                  alt={`Portrait of ${authorBio.name}`}
                  width={72}
                  height={88}
                  className="h-[88px] w-[72px] object-cover object-top grayscale contrast-110"
                />
                </dd>
              </div>
              <div className="rule border-b px-4 py-3 sm:border-b-0 sm:border-r">
                <dt className="text-[9px] text-muted">Drawn by</dt>
                <dd className="mt-1 text-ink">{authorBio.name}</dd>
              </div>
              <div className="rule px-4 py-3 sm:border-r">
                <dt className="text-[9px] text-muted">Role</dt>
                <dd className="mt-1 normal-case tracking-normal text-ink">{authorBio.title}</dd>
              </div>
              <div className="rule col-span-2 border-t px-4 py-3 sm:col-span-1 sm:border-t-0">
                <dt className="text-[9px] text-muted">Contact</dt>
                <dd className="mt-1 normal-case tracking-normal">
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="link text-ink">
                    LinkedIn ↗
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <p className="serif text-3xl leading-snug text-ink lg:text-4xl">
                <em>&ldquo;{authorBio.quote}&rdquo;</em>
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5 text-ink-2">
                {authorBio.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <p className="mt-8 grid grid-cols-[auto_1fr] gap-4 border-t border-dashed rule pt-4 text-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted pt-0.5">Currently learning</span>
                <span className="text-ink">{authorBio.learning}</span>
              </p>
              <ul className="mt-10 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <li key={c} className="border border-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-mm border-t rule py-20 lg:py-28">
        <Container>
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
          {/* Stations are placed along the route one after another. */}
          <Reveal as="ol" stagger className="relative mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-7">
            {careerRoute.map((s, i) => {
              const last = i === careerRoute.length - 1;
              return (
                <li key={s.year + s.place} className="rule relative border-l py-2 pl-5 pr-3 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
                  <span
                    className={`absolute -left-[5px] top-3 h-2.5 w-2.5 rotate-45 border lg:-top-[5px] lg:left-0 ${last ? "bg-signal border-signal" : "border-line-strong bg-paper"}`}
                  />
                  <span className={`font-mono text-xs ${last ? "text-signal" : "text-muted"}`}>{s.year}</span>
                  <span className="serif mt-2 block text-xl leading-tight text-ink">{s.place}</span>
                  <span className="mt-1 block pb-4 text-sm text-muted">{s.role}</span>
                </li>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <TrackRecordSection id="track-record" sheet="04" />

      <CTASection />
    </>
  );
}

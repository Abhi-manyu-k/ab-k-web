import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Tbd } from "@/components/ui/Tbd";
import { CTASection } from "@/components/sections/CTASection";
import { talks } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { mailto, siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Talks & publications",
  description:
    "Talks, webinars and publications by Abhimanyu Kanwar on troubleshooting agents, multimodal RAG for field service and agentic AI in customer service.",
  path: "/talks",
});

const fmt = (d: string) => d.split("-").reverse().join(".");

const airsi = talks.find((t) => t.id === "airsi-2025");

// TODO(launch): once known, add `datePublished` (full date), `sameAs`/`url` (DOI or PDF) and the exact `headline`.
const scholarlyArticle = airsi && {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: airsi.title.replace(/\s*\(working title\)$/, ""),
  author: { "@type": "Person", name: siteConfig.author, url: `${siteConfig.url}/about` },
  datePublished: airsi.date ?? airsi.year,
  isPartOf: { "@type": "PublicationEvent", name: airsi.venue },
  about: ["Troubleshooting agents", "Retrieval-augmented generation", "Knowledge graphs", "Semiconductor equipment service"],
  ...(airsi.link ? { url: airsi.link.href } : {}),
};

export default function TalksPage() {
  return (
    <>
      {scholarlyArticle && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticle) }} />
      )}
      <PageHero
        sheet="04"
        eyebrow="Talks & publications"
        title={
          <>
            Said out loud, <em>written down.</em>
          </>
        }
        description="Papers, talks and webinars on troubleshooting agents, retrieval for field service and agentic AI in customer service."
      >
        <a href={mailto("Speaking invitation")} className="btn btn-ink mt-10">
          Invite me to speak
        </a>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="border border-ink">
            <div className="hidden grid-cols-[3rem_7rem_1fr_1.4fr_6rem_8rem] border-b border-ink bg-paper-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted lg:grid">
              <span className="border-r border-ink px-3 py-2">Pos.</span>
              <span className="border-r border-ink px-3 py-2">Date</span>
              <span className="border-r border-ink px-3 py-2">Venue</span>
              <span className="border-r border-ink px-3 py-2">Title</span>
              <span className="border-r border-ink px-3 py-2">Type</span>
              <span className="px-3 py-2">Slides / paper</span>
            </div>
            {/* The register's frame holds still; its rows land in turn. */}
            <Reveal as="ol" stagger>
              {talks.map((t, i) => (
                  <li
                    key={t.id}
                    id={t.id}
                    className={`${t.link ? "row-hover " : ""}grid grid-cols-[3rem_1fr] border-b border-ink last:border-b-0 lg:grid-cols-[3rem_7rem_1fr_1.4fr_6rem_8rem]`}
                  >
                    <span className="row-span-5 border-r border-ink px-3 py-5 font-mono text-[11px] text-muted lg:row-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="px-4 pt-5 font-mono text-[11px] text-ink lg:border-r lg:border-ink lg:px-3 lg:py-5">
                      {t.date ? fmt(t.date) : t.year ? <>{t.year} · <Tbd>date</Tbd></> : <Tbd>date</Tbd>}
                    </span>
                    <span className="px-4 pt-2 text-sm font-medium text-ink lg:border-r lg:border-ink lg:px-3 lg:py-5">
                      {t.venue}
                    </span>
                    <span className="px-4 pt-1 lg:border-r lg:border-ink lg:px-3 lg:py-5">
                      <span className="serif block text-2xl leading-snug text-ink">{t.title}</span>
                    </span>
                    <span className="px-4 pt-2 lg:border-r lg:border-ink lg:px-3 lg:py-5">
                      <span className="inline-block border border-ink px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink">
                        {t.type}
                      </span>
                    </span>
                    <span className="col-start-2 px-4 pt-2 pb-5 font-mono text-[11px] lg:col-start-auto lg:px-3 lg:py-5">
                      {t.link ? (
                        <a href={t.link.href} target="_blank" rel="noopener noreferrer" className="link text-ink">
                          {t.link.label} <span className="row-arrow">↗</span>
                        </a>
                      ) : (
                        <Tbd>{t.type === "Paper" ? "paper link" : t.type === "Webinar" ? "recording" : "slides"}</Tbd>
                      )}
                    </span>
                  </li>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

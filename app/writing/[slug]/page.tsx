import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { getVisibleEssays, isPublished } from "@/lib/writing";

export const dynamicParams = false;

/** Placeholder param so the static export builds while nothing is published yet; it renders a 404. */
const EMPTY = "_none";

export async function generateStaticParams() {
  const essays = await getVisibleEssays();
  return essays.length ? essays.map((e) => ({ slug: e.slug })) : [{ slug: EMPTY }];
}

async function getEssay(slug: string) {
  return (await getVisibleEssays()).find((e) => e.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return { robots: { index: false, follow: false } };
  return pageMetadata({
    title: essay.title,
    description: essay.abstract,
    path: `/writing/${essay.slug}`,
    type: "article",
    // Drafts are never indexed, even when SHOW_DRAFTS renders them on a preview.
    noindex: !isPublished(essay),
  });
}

const fmt = (d: string) => d.split("-").reverse().join(".");

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  const { Content } = essay;
  const draft = !isPublished(essay);

  const jsonLd = draft
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: essay.title,
        description: essay.abstract,
        datePublished: essay.date,
        author: { "@type": "Person", name: siteConfig.author, url: `${siteConfig.url}/about` },
        url: `${siteConfig.url}/writing/${essay.slug}`,
      };

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <PageHero sheet={essay.number} eyebrow={`Writing · ${essay.topic}`} title={essay.title} description={essay.abstract}>
        <dl className="mt-10 flex flex-wrap font-mono text-[10px] uppercase tracking-[0.08em] sm:inline-flex">
          {[
            ["No.", essay.number],
            ["Date", essay.date ? fmt(essay.date) : "—"],
            ["Author", siteConfig.authorShort],
            ["Status", essay.status],
          ].map(([k, v]) => (
            <div key={k} className="rule border-l px-4 py-2.5 first:border-l-0 first:pl-0">
              <dt className="text-muted">{k}</dt>
              <dd className={`mt-0.5 ${k === "Status" && draft ? "text-signal" : "text-ink"}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container>
          <article className="prose-sheet mx-auto max-w-2xl">
            {draft && (
              <p className="mb-10 -rotate-2 inline-block border-2 border-signal px-4 py-2 font-mono text-sm uppercase tracking-[0.14em] text-signal">
                Draft — not for release
              </p>
            )}
            <Content />
          </article>
          <p className="mx-auto mt-16 max-w-2xl border-t rule pt-6">
            <Link href="/writing" className="note link !text-ink">
              ← Drawing register
            </Link>
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

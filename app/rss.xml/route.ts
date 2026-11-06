import { siteConfig } from "@/lib/site";
import { getPublishedEssays } from "@/lib/writing";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of published essays only — drafts never appear here. */
export async function GET() {
  const essays = await getPublishedEssays();
  const items = essays
    .map((e) => {
      const link = `${siteConfig.url}/writing/${e.slug}`;
      return `    <item>
      <title>${esc(e.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${esc(e.abstract)}</description>
      <category>${esc(e.topic)}</category>
      <pubDate>${new Date(`${e.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${siteConfig.author} · ${siteConfig.name} — Writing`)}</title>
    <link>${siteConfig.url}/writing</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc("Essays on service agents, AI governance, machine data and AI in operations.")}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

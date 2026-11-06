import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Per-page metadata with matching Open Graph and Twitter cards.
 * Next.js replaces (not merges) a parent's `openGraph`, so every page sets the full object.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  type = "website",
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  ogTitle?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}): Metadata {
  const fullTitle = ogTitle ?? (title ? `${title} · ${siteConfig.author}` : `${siteConfig.author} · ${siteConfig.name}`);
  const image = { url: siteConfig.ogImage, width: 1200, height: 630, alt: "Agents that act. Governance that holds." };

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.author} — Writing` }] },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_GB",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

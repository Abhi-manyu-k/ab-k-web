import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getPublishedEssays } from "@/lib/writing";

export const dynamic = "force-static";

/** Drafts are never listed. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/framework", "/governance", "/writing", "/talks", "/about", "/contact", "/impressum", "/datenschutz"];
  const essays = await getPublishedEssays();
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}` })),
    ...essays.map((e) => ({ url: `${siteConfig.url}/writing/${e.slug}`, lastModified: e.date ?? undefined })),
  ];
}

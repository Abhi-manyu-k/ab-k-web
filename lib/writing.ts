import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type EssayStatus = "Draft" | "Published";

export interface EssayMeta {
  number: string;
  title: string;
  abstract: string;
  topic: string;
  status: EssayStatus;
  /** ISO date (YYYY-MM-DD); required once published. */
  date: string | null;
}

export interface Essay extends EssayMeta {
  slug: string;
  Content: ComponentType;
}

const DIR = path.join(process.cwd(), "content", "writing");

/**
 * Drafts never reach a production build: they are left out of the register, the RSS feed,
 * the sitemap and the static pages. Set SHOW_DRAFTS=true (e.g. on a Netlify deploy preview)
 * to render them — always with noindex.
 */
export const showDrafts = process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "true";

export const isPublished = (e: Pick<EssayMeta, "status" | "date">) => e.status === "Published" && e.date !== null;

async function load(slug: string): Promise<Essay> {
  const mod = (await import(`@/content/writing/${slug}.mdx`)) as { default: ComponentType; metadata: EssayMeta };
  return { slug, ...mod.metadata, Content: mod.default };
}

/** All essays, including drafts, newest first then by number. */
export async function getAllEssays(): Promise<Essay[]> {
  const slugs = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  const essays = await Promise.all(slugs.map(load));
  return essays.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.number.localeCompare(b.number));
}

/** Essays that may be rendered in this build. */
export async function getVisibleEssays(): Promise<Essay[]> {
  return (await getAllEssays()).filter((e) => isPublished(e) || showDrafts);
}

export async function getPublishedEssays(): Promise<Essay[]> {
  return (await getAllEssays()).filter(isPublished);
}

/** Link to an essay if it is published, otherwise to the fallback page. */
export async function essayHref(slug: string, fallback: string): Promise<string> {
  const essay = (await getAllEssays()).find((e) => e.slug === slug);
  return essay && isPublished(essay) ? `/writing/${slug}` : fallback;
}

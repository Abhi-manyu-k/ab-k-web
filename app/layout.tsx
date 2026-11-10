import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GridLamp } from "@/components/ui/GridLamp";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/*
 * All fonts are self-hosted (SIL Open Font License) — the same latin subsets Google Fonts served
 * before, so the type renders exactly as it did. No request goes to Google, at build time or in the
 * visitor's browser.
 *
 * - IBM Plex Sans / Mono: next/font/local (app/fonts). Sans is preloaded (it sets the LCP text).
 * - Fraunces: plain @font-face in globals.css (public/fonts), so the roman and italic cuts share one
 *   family. Its weight axis is trimmed to the 300–400 the
 *   design uses.
 */
const plexSans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-variable.woff2", weight: "100 700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-code",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.author} · ${siteConfig.name} — Agents that act. Governance that holds.`,
    template: `%s · ${siteConfig.author}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author, url: `${siteConfig.url}/about` }],
  creator: siteConfig.author,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.author} — Writing` }] },
  },
  openGraph: {
    title: `${siteConfig.author} · ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#111110",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Both Fraunces cuts are preloaded: page titles set italic words, and a late italic swap shifts the layout.
  preload("/fonts/fraunces-latin-normal.v1.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/fraunces-latin-italic.v1.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal animations only hide content once scripting is known to work (html.js). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen antialiased">
        <GridLamp />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

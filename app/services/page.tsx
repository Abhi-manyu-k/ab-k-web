import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { autonomyLevels, enterpriseUseCases, practices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Practices",
  description:
    "Agentic service, AI governance, Virtual Employees and AI academy — four practices from AB Kinetics for European industry.",
};

function Figure({ id }: { id: string }) {
  if (id === "service-agents" || id === "academy") {
    const img =
      id === "service-agents"
        ? { src: "/images/hero-artifact.webp", alt: "Agent code in an IDE next to a field engineer at a machine", cap: "Agent code meets the shop floor" }
        : { src: "/images/rag-whiteboard.webp", alt: "Whiteboard sketch of a hierarchical retrieval architecture", cap: "Workshop board — hierarchical retrieval" };
    return (
      <figure className="border border-ink bg-paper-3 p-2">
        <Image
          src={img.src}
          alt={img.alt}
          width={1200}
          height={800}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="h-auto w-full grayscale contrast-125 mix-blend-multiply"
        />
        <figcaption className="flex justify-between px-1 pt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          <span>Fig. — {img.cap}</span>
          <span>Photo</span>
        </figcaption>
      </figure>
    );
  }

  if (id === "governance") {
    return (
      <figure className="border border-ink bg-paper-3">
        <div className="border-b border-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          Fig. — Controls by autonomy level
        </div>
        <ul>
          {autonomyLevels.map((l) => (
            <li key={l.level} className="grid grid-cols-[3rem_1fr] border-b rule last:border-b-0">
              <span className="border-r rule px-3 py-3 font-mono text-xs text-signal">{l.level}</span>
              <span className="px-3 py-3 text-sm">
                <span className="font-medium text-ink">{l.name}</span>
                <span className="block text-muted">{l.controls.join(" · ")}</span>
              </span>
            </li>
          ))}
        </ul>
      </figure>
    );
  }

  return (
    <figure className="border border-ink bg-paper-3">
      <div className="border-b border-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
        Fig. — Roster, Muster AG
      </div>
      <ul className="grid sm:grid-cols-3">
        {enterpriseUseCases.map((u, i) => (
          <li key={u.id} className="border-b rule p-4 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="font-mono text-[10px] text-faint">VE-0{142 + i * 67}</span>
            <span className="serif mt-2 block text-2xl italic text-ink">{u.title}</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-signal">{u.department}</span>
            <span className="mt-3 block text-sm text-muted">{u.description}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        sheet="02"
        eyebrow="Practices"
        title={
          <>
            From first agent to <em>governed production.</em>
          </>
        }
        description="Four practices that work alone or as one assembly. Each starts small, with a fixed scope, and scales once it has earned it."
      >
        <ol className="mt-12 flex flex-wrap gap-2">
          {practices.map((p) => (
            <li key={p.id}>
              <Link
                href={`#${p.id}`}
                className="inline-block border border-ink bg-paper px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="text-signal">{p.code}</span> {p.title}
              </Link>
            </li>
          ))}
        </ol>
      </PageHero>

      {practices.map((p, index) => (
        <section key={p.id} id={p.id} className="scroll-mt-20 border-b rule-ink py-20 last:border-b-0 lg:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <FadeInOnScroll className="lg:sticky lg:top-24 lg:self-start">
                <p className="note flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink font-mono text-[11px] text-ink">
                    {index + 1}
                  </span>
                  {p.code} · {p.audience}
                </p>
                <h2 className="display mt-8 text-6xl lg:text-8xl">{p.title}</h2>
                <p className="serif mt-6 text-3xl italic leading-snug text-ink-2">{p.headline}</p>
                <p className="lead mt-6 max-w-lg">{p.summary}</p>
              </FadeInOnScroll>

              <FadeInOnScroll delay={100}>
                <p className="note mb-4 !text-ink">Deliverables</p>
                <ol className="border-t border-ink">
                  {p.deliverables.map((d, i) => (
                    <li key={d} className="grid grid-cols-[3rem_1fr] border-b rule py-4">
                      <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-ink-2">{d}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 grid grid-cols-[6rem_1fr] border border-ink font-mono text-[11px]">
                  <span className="border-r border-ink bg-paper-2 px-3 py-2.5 uppercase tracking-[0.08em] text-muted">Format</span>
                  <span className="px-3 py-2.5 text-ink">{p.format}</span>
                </div>
                <div className="mt-10">
                  <Figure id={p.id} />
                </div>
              </FadeInOnScroll>
            </div>
          </Container>
        </section>
      ))}

      <CTASection />
    </>
  );
}

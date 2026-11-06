import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { mailto, siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Invite Abhimanyu Kanwar to speak, collaborate on research on service agents and AI governance, or ask about the autonomy framework.",
  path: "/contact",
});

const routes = [
  { k: "Speaking", v: "Conference talks, panels and webinars on service agents and AI governance.", subject: "Speaking invitation" },
  { k: "Research", v: "Collaborations on troubleshooting agents, retrieval for field service, or agent governance.", subject: "Research collaboration" },
  { k: "Questions", v: "About the autonomy framework or something I wrote.", subject: "Question" },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        sheet="06"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <em>talk.</em>
          </>
        }
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="note mb-3">Direct</p>
              <a href={mailto()} className="serif link text-3xl text-ink sm:text-4xl">
                {siteConfig.contact.email}
              </a>

              <p className="note mt-14 mb-6">What I&apos;m glad to hear about</p>
              <ol className="border-t border-ink">
                {routes.map((r) => (
                  <li key={r.k} className="grid grid-cols-[6rem_1fr] border-b rule py-4">
                    <a href={mailto(r.subject)} className="link self-start font-mono text-[11px] uppercase tracking-[0.08em] text-signal">
                      {r.k}
                    </a>
                    <span className="text-sm text-ink-2">{r.v}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-10 text-sm text-muted">
                Based in {siteConfig.location}. I reply in English or German.
              </p>
            </div>

            <div className="crop border border-ink bg-paper-3 p-6 sm:p-10">
              <p className="note mb-8 flex justify-between">
                <span>Form ABK-06 · Message</span>
                <span>1 / 1</span>
              </p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

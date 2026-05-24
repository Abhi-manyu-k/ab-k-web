import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `${siteConfig.contact.formTitle} with AB Kinetics to accelerate your AI transition.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b divider-subtle pt-32 pb-12 lg:pt-40 lg:pb-16">
        <Container>
          <SectionHeading
            eyebrow="Get in touch"
            title={siteConfig.contact.formTitle}
            description="Tell us where you are in your AI journey. We'll respond with a focused conversation on whatever moves you forward fastest."
          />
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-deep text-cyan-neon">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Email</p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-text-muted transition-colors hover:text-cyan-neon"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-deep text-cyan-neon">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Engagement model</p>
                    <p className="text-text-muted">
                      Remote-first with on-site availability for industrial and operational
                      contexts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-elevated p-8 lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

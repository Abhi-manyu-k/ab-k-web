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
      <section className="border-b divider-subtle pt-32 pb-20 lg:pt-44 lg:pb-28">
        <Container>
          <SectionHeading
            eyebrow="Get in touch"
            title={siteConfig.contact.formTitle}
            description="Tell us where you are in your AI journey. We'll respond with a focused conversation on whatever moves you forward fastest."
          />
        </Container>
      </section>

      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
            <div className="lg:col-span-2">
              <div className="space-y-10">
                <div>
                  <p className="mono-label mb-3 flex items-center gap-2">
                     <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                     Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="serif-heading text-2xl text-warm-white transition-colors hover:text-amber-action"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                
                <hr className="hr-editorial" />
                
                <div>
                  <p className="mono-label mb-3 flex items-center gap-2">
                     <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                     Engagement model
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-text-muted">
                    Remote-first with on-site availability for industrial and operational
                    contexts.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 border-t divider-subtle lg:border-t-0 pt-12 lg:pt-0">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

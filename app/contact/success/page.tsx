import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Message Sent",
  description: "Thank you for contacting AB Kinetics.",
};

export default function ContactSuccessPage() {
  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <Container className="text-center">
        <h1 className="serif-heading gradient-text text-[2.5rem] sm:text-[3rem]">
          Message received
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[0.9375rem] leading-relaxed text-text-muted">
          Thank you for reaching out. We&apos;ll review your inquiry and respond shortly.
        </p>
        <div className="mt-12">
          <Link
            href="/"
            className="link-underline text-sm font-medium text-warm-white hover:text-amber-action"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}

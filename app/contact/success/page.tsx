import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Message Sent",
  description: "Thank you for contacting AB Kinetics.",
};

export default function ContactSuccessPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-signal text-signal">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="display mt-8 text-6xl sm:text-7xl">
          Message <em className="accent-italic">received.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
          Thank you for reaching out. We&apos;ll review your inquiry and respond shortly.
        </p>
        <Link href="/" className="btn btn-ghost mt-10">
          Back to home
        </Link>
      </Container>
    </section>
  );
}

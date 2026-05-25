import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Message Sent",
  description: "Thank you for contacting AB Kinetics.",
};

export default function ContactSuccessPage() {
  return (
    <section className="flex min-h-[70vh] items-center pt-24">
      <Container className="text-center">
        <h1 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
          Message received
        </h1>
        <p className="mx-auto mt-4 max-w-md text-text-muted">
          Thank you for reaching out. We&apos;ll review your inquiry and respond shortly.
        </p>
        <div className="mt-8">
          <Button href="/">Back to Home</Button>
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Or explore our{" "}
          <Link href="/services" className="text-amber-action hover:underline">
            services
          </Link>{" "}
          while you wait.
        </p>
      </Container>
    </section>
  );
}

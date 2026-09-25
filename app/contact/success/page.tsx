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
      <Container>
        <div className="frame bg-mm mx-auto max-w-3xl px-6 py-20 text-center sm:px-12">
          <span className="mx-auto inline-block -rotate-6 border-2 border-ok px-4 py-2 font-mono text-sm uppercase tracking-[0.14em] text-ok">
            Received ✓
          </span>
          <h1 className="display mt-10 text-6xl sm:text-7xl">
            Logged. <em>We&apos;ll be in touch.</em>
          </h1>
          <p className="lead mx-auto mt-6 max-w-md bg-paper/80">
            Thanks for reaching out — expect a reply within two working days.
          </p>
          <Link href="/" className="btn btn-line mt-10 bg-paper">
            Back to sheet 01
          </Link>
        </div>
      </Container>
    </section>
  );
}

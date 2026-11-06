import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Annotation } from "@/components/ui/Annotation";

export const metadata = {
  title: "Sheet not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <Container>
        <div className="frame bg-mm mx-auto max-w-3xl px-6 py-20 text-center sm:px-12">
          <span className="mx-auto inline-block -rotate-6 border-2 border-signal px-4 py-2 font-mono text-sm uppercase tracking-[0.14em] text-signal">
            Error 404 · Void
          </span>
          <h1 className="display mt-10 text-6xl sm:text-7xl">
            This sheet is <em>not in the set.</em>
          </h1>
          <p className="lead mx-auto mt-6 max-w-md bg-paper/80">
            It may have been superseded by a later revision — or never drawn at all.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn btn-ink">
              Back to sheet 00
            </Link>
            <Link href="/framework" className="btn btn-line bg-paper">
              The framework
            </Link>
          </div>
          <p className="mt-8">
            <Annotation arrow="none" rotate={-2}>
              checked by: nobody, apparently
            </Annotation>
          </p>
        </div>
      </Container>
    </section>
  );
}

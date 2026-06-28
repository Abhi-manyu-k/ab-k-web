import { Container } from "@/components/ui/Container";
import { trustStripItems } from "@/lib/site";

export function TrustStrip() {
  return (
    <section className="border-b divider-subtle bg-slate-deep/40 py-5">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {trustStripItems.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-border/50 bg-slate-deep/80 px-3.5 py-1.5 text-xs font-medium text-text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

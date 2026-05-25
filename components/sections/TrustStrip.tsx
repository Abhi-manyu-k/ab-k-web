import { Container } from "@/components/ui/Container";
import { trustStripItems } from "@/lib/site";

export function TrustStrip() {
  return (
    <section className="border-b divider-subtle bg-slate-deep/40 py-8 lg:py-10">
      <Container>
        <ul className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between lg:gap-8">
          {trustStripItems.map((item, index) => (
            <li
              key={item.title}
              className="flex min-w-[200px] flex-1 flex-col sm:max-w-[240px] lg:max-w-none"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-semibold tabular-nums text-amber-action">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-sm font-semibold text-text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="mt-1.5 pl-8 text-sm text-text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

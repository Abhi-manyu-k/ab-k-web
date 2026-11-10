import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const generalNotes = [
  "Agents act only within their approved autonomy level (L0–L4).",
  "Every action is logged, attributable and reversible.",
  "Sensitive data stays on EU-hosted models by default.",
  "Designed against the AI Act, Machinery Regulation (EU) 2023/1230 and the Data Act.",
  "Written by an engineer who has serviced the machines.",
];

/* General notes of the sheet: on the bare sheet, directly under the hero. */
export function NotesSection() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="general-notes">
      <Container className="grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-16 xl:grid-cols-[22rem_1fr]">
        <Reveal>
          <p id="general-notes" className="note">
            General notes
          </p>
          <p className="mt-3 text-muted">Unless otherwise specified:</p>
          <p className="mt-1 text-ink">Human in the loop.</p>
        </Reveal>

        <div>
          <Reveal as="ol" stagger className="grid font-mono text-[12px] leading-relaxed text-ink-2 lg:grid-cols-2 lg:gap-x-10">
            {generalNotes.map((n, i) => (
              <li key={n} className="grid grid-cols-[1.5rem_1fr] border-t rule py-4">
                <span className="text-faint">{i + 1}.</span>
                <span>{n}</span>
              </li>
            ))}
          </Reveal>
          <Reveal
            as="p"
            delay={300}
            className="mt-6 flex flex-wrap justify-end gap-x-3 font-mono text-[10px] uppercase tracking-[0.1em]"
          >
            <span className="text-muted">Tolerance</span>
            <span className="text-signal">± 0 unlogged actions</span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

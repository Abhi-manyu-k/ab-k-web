import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { AutonomyLadder } from "@/components/ui/AutonomyLadder";
import { SheetHeader } from "@/components/ui/SheetHeader";

export function AutonomySection() {
  return (
    <section className="bg-mm border-t rule-ink py-20 lg:py-32">
      <Container>
        <FadeInOnScroll>
          <SheetHeader
            sheet="04"
            label="Section A–A · Autonomy"
            title={
              <>
                An agent <em>earns</em> the right to act.
              </>
            }
            intro="Autonomy is a staircase, not a switch. Every step up unlocks more value — and requires more control. Pick a level to see what it takes."
          />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="mt-24">
            <AutonomyLadder />
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}

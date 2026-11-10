import { Reveal, type RevealProps } from "@/components/ui/Reveal";

/** Kept for existing imports: a default `rise` reveal. Prefer `Reveal` in new code. */
export function FadeInOnScroll(props: RevealProps) {
  return <Reveal {...props} />;
}

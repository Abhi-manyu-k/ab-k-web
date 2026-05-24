import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "muted";
}

/** @deprecated Prefer Card — kept for gradual migration */
export function AnimatedCard({
  children,
  className,
  variant = "default",
}: AnimatedCardProps) {
  return (
    <Card variant={variant} className={cn(className)}>
      {children}
    </Card>
  );
}

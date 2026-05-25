import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "muted";
  trace?: boolean;
}

const variantStyles = {
  default: "surface-card",
  elevated: "surface-elevated",
  muted: "rounded-2xl bg-slate-deep/50",
};

export function Card({
  children,
  className,
  variant = "default",
  trace = true,
}: CardProps) {
  return (
    <div
      className={cn(
        variantStyles[variant],
        trace && "card-trace",
        "p-6 lg:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

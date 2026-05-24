import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-electric to-cyan-neon text-onyx font-semibold hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]",
  secondary:
    "border border-slate-border bg-slate-card/50 text-text-primary hover:border-cyan-neon/50 hover:bg-slate-card",
  ghost: "text-text-muted hover:text-cyan-neon",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon focus-visible:ring-offset-2 focus-visible:ring-offset-onyx",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button type="button" className={classes}>{children}</button>;
}

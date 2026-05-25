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
    "bg-amber-action text-onyx font-semibold hover:bg-amber-hover",
  secondary:
    "border border-amber-action/50 bg-transparent text-amber-action hover:bg-amber-action/10",
  ghost: "text-text-muted hover:text-amber-action",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[0.9375rem]",
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
    "inline-flex items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action focus-visible:ring-offset-2 focus-visible:ring-offset-onyx",
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

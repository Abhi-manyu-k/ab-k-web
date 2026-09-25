import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-md border border-line-strong bg-ink-2 transition-colors group-hover:border-signal">
        <svg viewBox="0 0 100 100" className="h-4 w-4 text-paper" fill="currentColor" aria-hidden="true">
          <path d="M12 18 H38 V42 H28 V82 H22 V42 H12 Z" />
          <path d="M48 18 H88 V28 H58 V44 H82 V54 H58 V72 H88 V82 H48 Z" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal" />
      </span>
      <span className="whitespace-nowrap text-[0.95rem] font-medium tracking-tight text-paper">
        {siteConfig.name}
      </span>
    </Link>
  );
}

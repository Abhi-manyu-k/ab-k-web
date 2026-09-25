import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-7 w-7 items-center justify-center border border-ink bg-paper transition-colors group-hover:bg-ink">
        <svg
          viewBox="0 0 100 100"
          className="h-4 w-4 text-ink transition-colors group-hover:text-paper"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 18 H38 V42 H28 V82 H22 V42 H12 Z" />
          <path d="M48 18 H88 V28 H58 V44 H82 V54 H58 V72 H88 V82 H48 Z" />
        </svg>
        <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 bg-signal" />
      </span>
      <span className="whitespace-nowrap font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink">
        {siteConfig.name}
      </span>
    </Link>
  );
}

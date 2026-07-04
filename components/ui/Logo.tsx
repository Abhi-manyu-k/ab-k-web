import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
}

export function Logo({ showTagline = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-action focus-visible:ring-offset-2 focus-visible:ring-offset-onyx",
        className,
      )}
    >
      <svg
        className="h-7 w-auto text-warm-white/80 transition-colors group-hover:text-warm-white"
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 18 H38 V42 H28 V82 H22 V42 H12 Z" />
        <path d="M48 18 H88 V28 H58 V44 H82 V54 H58 V72 H88 V82 H48 Z" />
      </svg>
      <div className="flex flex-col">
        <span className="font-logo text-lg font-bold tracking-tight text-warm-white">
          {siteConfig.name}
        </span>
        {showTagline && (
          <span className="hidden text-xs text-text-muted sm:block">
            {siteConfig.tagline}
          </span>
        )}
      </div>
    </Link>
  );
}

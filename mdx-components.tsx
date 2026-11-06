import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Essay typography lives in `.prose-sheet` (globals.css).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}

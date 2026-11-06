import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  // Redirects for the static export live in netlify.toml (/services, /case-studies).
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

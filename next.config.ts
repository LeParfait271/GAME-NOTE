import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Game Note is a browser-only guide reader. Export the app as static HTML
  // so Cloudflare Pages can serve it directly, like Cook Note.
  output: "export",
};

export default nextConfig;

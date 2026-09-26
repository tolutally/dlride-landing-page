import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

function getHomepageMarkup() {
  const source = fs.readFileSync(
    path.join(process.cwd(), "public", "ride.html"),
    "utf8",
  );
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!body) {
    throw new Error("Could not find the homepage body in public/ride.html");
  }

  return body[1];
}

export default function Home() {
  const homepageMarkup = getHomepageMarkup();

  return (
    <>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />
      <Script
        src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2026/08/23/07/20260823072218-ZV0U13CL.js"
        strategy="afterInteractive"
      />
      <div dangerouslySetInnerHTML={{ __html: homepageMarkup }} />
    </>
  );
}

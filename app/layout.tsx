import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: "Affordable Weekly Car Rentals in Atlanta | DLride Rentals",
    template: "%s | DLride",
  },
  description:
    "Rent reliable, affordable cars in Atlanta with flexible weekly rentals, unlimited miles, maintenance included, and fast approval. Apply online today.",
  applicationName: "DLride",
  keywords: [
    "weekly car rentals Atlanta",
    "gig worker car rental",
    "travel nurse car rental",
    "unlimited mileage rental",
    "DLride",
  ],
  authors: [{ name: "DLride" }],
  creator: "DLride",
  publisher: "DLride",
  category: "Car rental",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-64x64.png", type: "image/png", sizes: "64x64" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DLride",
    title: "DLride | Weekly Car Rentals in Atlanta",
    description:
      "A reliable car for work, life, and everything in between. Flexible weekly rentals across Atlanta.",
    images: [
      {
        url: "/meta-card.png",
        width: 1731,
        height: 909,
        alt: "DLride weekly car rentals in Atlanta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DLride | Weekly Car Rentals in Atlanta",
    description:
      "A reliable car for work, life, and everything in between.",
    images: ["/meta-card.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#122A52",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

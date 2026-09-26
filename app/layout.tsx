import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://dlride.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Weekly Car Rentals for Gig Drivers in Atlanta | DLride",
    template: "%s | DLride",
  },
  description:
    "Rent a reliable car by the week for rideshare and delivery work in Atlanta. Flexible weekly rentals with unlimited miles and maintenance included. Apply online with DLride.",
  applicationName: "DLride",
  keywords: [
    "weekly car rentals Atlanta",
    "gig driver car rental Atlanta",
    "rideshare driver rental",
    "delivery driver car rental",
    "unlimited mileage rental",
    "DLride",
  ],
  authors: [{ name: "DLride" }],
  creator: "DLride",
  publisher: "DLride",
  category: "Car rental",
  robots: {
    index: true,
    follow: true,
  },
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
    title: "Weekly Car Rentals for Gig Drivers in Atlanta | DLride",
    description:
      "Reliable weekly car rentals for Atlanta rideshare and delivery drivers, with unlimited miles and maintenance included.",
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
    title: "Weekly Car Rentals for Gig Drivers in Atlanta | DLride",
    description:
      "Reliable weekly car rentals for Atlanta rideshare and delivery drivers.",
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

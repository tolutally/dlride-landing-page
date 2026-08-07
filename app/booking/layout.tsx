import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Rental",
  description:
    "Reserve a flexible weekly DLride car rental in Atlanta and get back on the road.",
  openGraph: {
    title: "Book Your DLride Rental",
    description:
      "Reserve a reliable weekly car rental in Atlanta in just a few steps.",
    images: [
      {
        url: "/meta-card-light.png",
        width: 1731,
        height: 909,
        alt: "Book a DLride weekly car rental in Atlanta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your DLride Rental",
    description: "Reserve a reliable weekly car rental in Atlanta.",
    images: ["/meta-card-light.png"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { travelNursePage } from "@/lib/seoLandingPages";

export const metadata: Metadata = {
  title: { absolute: "Travel Nurse Car Rental in Atlanta | Weekly Rentals | DLride" },
  description: "Get a flexible weekly car rental for an Atlanta travel-nurse assignment. Unlimited miles and maintenance included, with insurance coverage included for a fee.",
  alternates: { canonical: "/travel-nurse-car-rental-atlanta" },
  openGraph: {
    title: "Travel Nurse Car Rental in Atlanta | Weekly Rentals | DLride",
    description: "Dependable weekly transportation for hospital commutes, rotating shifts, and temporary Atlanta assignments.",
    url: "/travel-nurse-car-rental-atlanta",
  },
};

export default function Page() {
  return <SeoLandingPage data={travelNursePage} />;
}

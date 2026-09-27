import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { ridesharePage } from "@/lib/seoLandingPages";

export const metadata: Metadata = {
  title: { absolute: "Rideshare Car Rental in Atlanta | Weekly Rentals | DLride" },
  description: "Apply for a weekly rideshare car rental in Atlanta with unlimited miles and maintenance included. Platform driver and vehicle requirements apply.",
  alternates: { canonical: "/rideshare-car-rental-atlanta" },
  openGraph: { title: "Rideshare Car Rental in Atlanta | Weekly Rentals | DLride", description: "Reliable weekly vehicles for Atlanta rideshare drivers using Uber, Lyft, or multiple apps.", url: "/rideshare-car-rental-atlanta" },
};

export default function Page() {
  return <SeoLandingPage data={ridesharePage} />;
}

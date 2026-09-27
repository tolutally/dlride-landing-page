import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { lyftPage } from "@/lib/seoLandingPages";

export const metadata: Metadata = {
  title: { absolute: "Lyft Car Rental in Atlanta | Weekly Rentals | DLride" },
  description: "Get a flexible weekly car rental for Lyft driving in Atlanta. DLride includes unlimited miles and maintenance. Lyft eligibility rules apply.",
  alternates: { canonical: "/lyft-car-rental-atlanta" },
  openGraph: { title: "Lyft Car Rental in Atlanta | Weekly Rentals | DLride", description: "Flexible weekly vehicles for Atlanta Lyft drivers who need reliable access to a car.", url: "/lyft-car-rental-atlanta" },
};

export default function Page() {
  return <SeoLandingPage data={lyftPage} />;
}

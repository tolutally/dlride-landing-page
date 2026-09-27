import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { uberPage } from "@/lib/seoLandingPages";

export const metadata: Metadata = {
  title: { absolute: "Uber Car Rental in Atlanta | Weekly Rentals | DLride" },
  description: "Looking for a car to drive Uber in Atlanta? Apply for a reliable DLride weekly rental with unlimited miles and routine maintenance included.",
  alternates: { canonical: "/uber-car-rental-atlanta" },
  openGraph: { title: "Uber Car Rental in Atlanta | Weekly Rentals | DLride", description: "Weekly rental vehicles for Atlanta rideshare drivers. Uber eligibility rules apply.", url: "/uber-car-rental-atlanta" },
};

export default function Page() {
  return <SeoLandingPage data={uberPage} />;
}

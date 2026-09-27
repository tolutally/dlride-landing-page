import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { gigDriverPage } from "@/lib/seoLandingPages";

export const metadata: Metadata = {
  title: { absolute: "Gig Driver Car Rental in Atlanta | Weekly Rentals | DLride" },
  description: "Rent a reliable car by the week for gig work in Atlanta. DLride includes unlimited miles and maintenance for rideshare and delivery drivers.",
  alternates: { canonical: "/gig-driver-car-rental-atlanta" },
  openGraph: { title: "Gig Driver Car Rental in Atlanta | Weekly Rentals | DLride", description: "Weekly Atlanta car rentals for rideshare, delivery, and multi-app gig drivers.", url: "/gig-driver-car-rental-atlanta" },
};

export default function Page() {
  return <SeoLandingPage data={gigDriverPage} />;
}

import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { doordashPage } from "@/lib/seoLandingPages";

export const metadata: Metadata = {
  title: { absolute: "DoorDash Car Rental in Atlanta | Weekly Rentals | DLride" },
  description: "Rent a car by the week for DoorDash delivery work in Atlanta. Get unlimited miles, routine maintenance, and flexible weekly access with DLride.",
  alternates: { canonical: "/doordash-car-rental-atlanta" },
  openGraph: { title: "DoorDash Car Rental in Atlanta | Weekly Rentals | DLride", description: "Weekly Atlanta car rentals built around delivery mileage and reliable vehicle access.", url: "/doordash-car-rental-atlanta" },
};

export default function Page() {
  return <SeoLandingPage data={doordashPage} />;
}

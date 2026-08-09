import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Received",
  description: "Your DLride rental application has been received.",
};

export default async function ApplicationSuccessPage({ searchParams }: PageProps<"/apply/success">) {
  const { application } = await searchParams;
  const applicationNumber = typeof application === "string" ? application : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white px-4 py-16 sm:px-6">
      <section className="w-full max-w-xl text-center" aria-labelledby="success-heading">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#2F5FAF]">DLride Rentals</p>
        <h1 id="success-heading" className="mt-3 text-4xl font-bold tracking-tight text-[#122A52] sm:text-5xl">Application received</h1>
        <p className="mt-5 text-lg font-semibold text-slate-700">Thanks for applying with DLride Rentals.</p>
        <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-slate-600">
          Your application has been submitted successfully. Our team will review it and contact you if we need any additional information.
        </p>
        {applicationNumber && (
          <div className="mx-auto mt-7 max-w-sm rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
            <p className="text-sm text-slate-600">Application number</p>
            <p className="mt-1 text-xl font-bold tracking-wide text-[#122A52]">{applicationNumber}</p>
          </div>
        )}
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#2F5FAF] px-8 py-3 text-base font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#264E91] focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Return to DLride
        </Link>
      </section>
    </main>
  );
}
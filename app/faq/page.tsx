import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about DLride weekly car rentals, eligibility, mileage, maintenance, roadside assistance, and service in Atlanta.",
};

const faqs = [
  {
    question: "Who can rent from DLride?",
    answer:
      "DLride is for anyone who needs a reliable car without a long-term commitment — including gig workers, travel nurses, shift workers, and Atlanta residents who need essential weekly transportation.",
  },
  {
    question: "Do I need good credit to rent a car?",
    answer:
      "No. DLride does not require a credit check, so your credit history doesn’t have to stand between you and getting on the road.",
  },
  {
    question: "Are there mileage limits?",
    answer:
      "No. DLride rentals include unlimited mileage, giving you the freedom to work, commute, run errands, or travel without watching the odometer.",
  },
  {
    question: "Can I use a DLride car for Uber, Lyft, or delivery apps?",
    answer:
      "Yes, DLride has vehicles suited for gig work, including rideshare and delivery. Vehicle requirements vary by platform, so confirm that your selected car meets the current requirements for the app you plan to use.",
  },
  {
    question: "I’m a travel nurse. Can I rent for an assignment?",
    answer:
      "Yes. Weekly rentals are a flexible option for travel nurses who need reliable transportation for hospital commutes, rotating shifts, or temporary assignments in Atlanta.",
  },
  {
    question: "Can I rent even if I’m not a gig worker?",
    answer:
      "Absolutely. You can rent for everyday driving, appointments, shift commutes, or other essential weekly transportation needs.",
  },
  {
    question: "Is maintenance included?",
    answer:
      "Routine maintenance is covered during your rental, so you don’t have to take on the usual upkeep that comes with owning a car.",
  },
  {
    question: "What happens if I have a problem on the road?",
    answer:
      "DLride provides daytime roadside assistance, so help is available during service hours if something goes wrong while you’re driving.",
  },
  {
    question: "How long can I rent a car for?",
    answer: "DLride is built around flexible weekly rentals.",
  },
  {
    question: "Where does DLride operate?",
    answer: "DLride serves drivers and renters in Atlanta and the Metro Atlanta area.",
  },
];

export default function FaqPage() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
        <div className="pointer-events-none absolute -left-28 top-32 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 top-1/3 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />

        <header className="relative z-20 mx-auto w-full max-w-5xl px-4 pt-3 sm:px-6">
          <div className="flex h-14 items-center justify-between rounded-full bg-slate-900/95 px-3 text-white shadow-2xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-xl">
            <Link href="/" className="flex items-center" aria-label="DLride home">
              <img src="/dlride-logo-white.png" alt="DLride" className="h-10 w-28 object-contain" />
            </Link>
            <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Main navigation">
              <Link href="/#available-cars" className="transition hover:text-white">Available Cars</Link>
              <Link href="/#how-it-works" className="transition hover:text-white">How It Works</Link>
              <Link href="/#why-dlride" className="transition hover:text-white">Why DLride</Link>
              <span className="text-white">FAQ</span>
            </nav>
            <Link href="/apply" className="rounded-full bg-gradient-to-r from-[#3f7ee8] to-[#35b89f] px-5 py-2.5 text-sm font-semibold text-white transition hover:from-[#5590ee] hover:to-[#46c8ad]">
              Apply now
            </Link>
          </div>
        </header>

        <section className="relative mx-auto max-w-5xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#157a78]">Questions, answered</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Before you get on the road, here’s what to know.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Everything you need to know about flexible weekly rentals for work, assignments, and essential transportation in Atlanta.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-3xl rounded-3xl border border-white/80 bg-white/80 px-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:mt-16 sm:px-8">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-slate-200 py-1 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left font-semibold text-slate-900 marker:content-none">
                  <div>{faq.question}</div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#157a78] transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-slate-600 sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600">Ready to get your week moving?</p>
            <Link href="/apply" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#173f88] to-[#157a78] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5">
              Apply for a rental <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      {/* Botpress config sets a custom toggleChatId/embeddedChatId, so neither bubble nor panel renders without these */}
      <div
        id="bp-embedded-webchat"
        className="fixed bottom-24 right-5 z-50 h-[600px] w-[380px] max-w-[calc(100vw-2.5rem)]"
        style={{ maxHeight: "calc(100vh - 7rem)" }}
      />
      <button
        id="bp-toggle-chat"
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#173f88] text-white shadow-2xl shadow-black/25 transition hover:bg-[#122e66]"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>

      <Script src="https://cdn.botpress.cloud/webchat/v5.0/inject.js" strategy="afterInteractive" />
      <Script src="https://files.bpcontent.cloud/2026/08/23/07/20260823072218-ZV0U13CL.js" strategy="afterInteractive" />
    </>
  );
}

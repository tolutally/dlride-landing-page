"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import RentalApplicationForm from "@/components/RentalApplicationForm";

const STROKE_WIDTH = 1.5;

// lucide-react dropped brand icons; Instagram glyph kept inline to match the rest of the icon set's style.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ApplyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <style>{
        /* EngageBay defaults the chat widget to bottom-left; force it bottom-right. */
        `.engagebay-chat-widget { left: auto !important; right: 20px !important; }`
      }</style>

      <header className="fixed left-1/2 top-3 z-50 w-full max-w-5xl -translate-x-1/2 px-3 text-white">
        <div className="relative flex h-14 items-center justify-between rounded-full bg-slate-900/95 px-3 ring-1 ring-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <Link href="/" className="flex items-center" aria-label="DLride home">
            <img src="/dlride-logo-white.png" alt="DLride" className="h-10 w-28 object-contain" />
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Main navigation">
            <Link href="/#available-cars" className="transition hover:text-white">Available Cars</Link>
            <Link href="/#how-it-works" className="transition hover:text-white">How It Works</Link>
            <Link href="/#why-dlride" className="transition hover:text-white">Why DLride</Link>
            <Link href="/#faq" className="transition hover:text-white">FAQ</Link>
          </nav>

          <a href="#booking-card" className="hidden h-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-white/10 to-white/5 px-6 text-sm font-medium text-white/90 shadow-lg backdrop-blur-xl transition hover:from-white/15 hover:to-white/10 md:inline-flex">
            Book Now
          </a>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu className="h-5 w-5" strokeWidth={STROKE_WIDTH} />
          </button>

          <nav
            className={`absolute left-3 right-3 top-16 ${mobileMenuOpen ? "" : "hidden"} rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl md:hidden`}
            aria-label="Mobile navigation"
          >
            <Link href="/#available-cars" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>Available Cars</Link>
            <Link href="/#how-it-works" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link href="/#why-dlride" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>Why DLride</Link>
            <Link href="/#faq" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <a href="#booking-card" className="mt-2 block rounded-full bg-[#2F5FAF] px-4 py-3 text-center text-sm font-semibold text-white" onClick={() => setMobileMenuOpen(false)}>Book Now</a>
          </nav>
        </div>
      </header>

      <main className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:pt-44">
        <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#7CA3E6]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 top-52 h-80 w-80 rounded-full bg-[#2F5FAF]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2F5FAF]">Weekly rentals in Atlanta</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#122A52] sm:text-6xl lg:text-7xl">Get the car you need in minutes</h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-xl sm:leading-8">
              Reserve your DLride car in minutes by completing the quick application below. We&apos;ll review and get you on the road ASAP!
            </p>
          </div>

          <section id="booking-card" className="scroll-mt-28 mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:mt-14 sm:p-10 lg:p-12" aria-labelledby="ready-heading">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF]">
                  <ClipboardCheck className="h-6 w-6" strokeWidth={STROKE_WIDTH} />
                </span>
                <h2 id="ready-heading" className="mt-4 text-2xl font-bold tracking-tight text-[#122A52] sm:text-3xl">What to have ready</h2>
              </div>

              <ul className="mt-8 space-y-5 text-base leading-7 text-slate-600 sm:text-lg">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF]"><Check className="h-4 w-4" strokeWidth={STROKE_WIDTH} /></span>
                  <span>Valid Georgia driver&apos;s license</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF]"><Check className="h-4 w-4" strokeWidth={STROKE_WIDTH} /></span>
                  <span>First week&apos;s payment (cash may be accepted)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF]"><Check className="h-4 w-4" strokeWidth={STROKE_WIDTH} /></span>
                  <span>Any additional document that could improve your application</span>
                </li>
              </ul>

              <RentalApplicationForm />

              <p className="mt-6 text-center text-sm text-slate-500 sm:text-base">
                Prefer to talk to someone? Call{" "}
                <a href="tel:+14049091666" className="font-semibold text-[#2F5FAF] hover:text-[#264E91]">(404) 909-1666</a>
              </p>
            </div>
          </section>

          <section className="mx-auto mt-6 grid max-w-4xl gap-6 lg:grid-cols-[1.2fr_0.8fr]" aria-label="What happens after applying and contact information">
            <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#2F5FAF]"><Sparkles className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                <h2 className="text-2xl font-bold tracking-tight text-[#122A52] sm:text-3xl">What&apos;s next?</h2>
              </div>

              <ol className="relative mt-7 space-y-7 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-blue-100">
                <li className="relative flex gap-4">
                  <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF] ring-4 ring-white"><Check className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                  <div>
                    <h3 className="font-bold text-[#122A52] sm:text-lg">Quick review</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">We&apos;ll review your application within 2 hours.</p>
                  </div>
                </li>
                <li className="relative flex gap-4">
                  <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF] ring-4 ring-white"><PhoneCall className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                  <div>
                    <h3 className="font-bold text-[#122A52] sm:text-lg">We&apos;ll contact you</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">Confirm details and schedule pick-up.</p>
                  </div>
                </li>
                <li className="relative flex gap-4">
                  <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2F5FAF] ring-4 ring-white"><MapPin className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                  <div>
                    <h3 className="font-bold text-[#122A52] sm:text-lg">Pick-up location</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">Exact address will be shared on approval.</p>
                  </div>
                </li>
              </ol>
            </article>

            <article className="relative overflow-hidden rounded-3xl bg-[#122A52] p-6 text-white shadow-lg shadow-blue-950/15 sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#7CA3E6]/20" />
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-blue-100"><HeartHandshake className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Need help?</h2>
                <p className="mt-2 text-sm leading-6 text-blue-200">A real person is here if you need a hand.</p>

                <div className="mt-7 space-y-3">
                  <a href="tel:+14049091666" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-blue-100"><Phone className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                    <span><span className="block text-sm font-semibold text-white">Call or text</span><span className="mt-1 block text-sm text-blue-200">+1 404-909-1666</span></span>
                  </a>
                  <a href="mailto:hello@dlride.com" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-blue-100"><Mail className="h-5 w-5" strokeWidth={STROKE_WIDTH} /></span>
                    <span><span className="block text-sm font-semibold text-white">Email</span><span className="mt-1 block text-sm text-blue-200">hello@dlride.com</span></span>
                  </a>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      <section className="border-b border-slate-100 bg-white py-7 sm:py-9 lg:py-10" aria-labelledby="platform-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center text-center lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-10 lg:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5FAF]">Built for Atlanta</p>
              <h2 id="platform-heading" className="mt-2 text-xl font-bold tracking-tight text-[#122A52] sm:text-2xl">Built for the apps Atlanta drives.</h2>
            </div>
            <div className="mt-5 lg:mt-0">
              <div className="grid grid-cols-6 items-center gap-x-2 gap-y-3 sm:grid-cols-5 sm:gap-x-4 lg:gap-x-7" aria-label="Supported driving platforms">
                <img src="/uber-eats-logo.png" alt="Uber Eats" className="col-span-2 mx-auto h-12 w-20 rounded-lg object-contain sm:col-span-1 sm:h-14" />
                <img src="/doordash-logo-clean.png" alt="DoorDash" className="col-span-2 mx-auto h-12 w-20 object-contain sm:col-span-1 sm:h-14" />
                <img src="/amazon-flex-2.jpeg" alt="Amazon Flex" className="col-span-2 mx-auto h-[6.25rem] w-[10.4rem] object-contain sm:col-span-1 sm:h-[7.3rem]" />
                <img src="/instacart-logo-clean.png" alt="Instacart" className="col-span-2 col-start-2 mx-auto h-12 w-24 object-contain sm:col-span-1 sm:col-start-auto sm:h-14 sm:w-28" />
                <img src="/grubhub-logo-clean.png" alt="Grubhub" className="col-span-2 mx-auto h-12 w-24 object-contain sm:col-span-1 sm:h-14 sm:w-28" />
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold text-[#122A52]/60 sm:text-xs">Hospital shifts • Everyday driving • Road trips • Temporary transportation</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-white/10 bg-[#122A52]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
            <div>
              <Link href="/" className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CA3E6]">
                <img src="/dlride-logo-white.png" alt="DLride" className="h-12 w-36 object-contain object-left" />
              </Link>
              <p className="mt-4 max-w-md text-sm leading-6 text-blue-200">Reliable weekly car rentals in Atlanta for gig work, travel assignments, everyday driving, and road trips — without a long-term commitment.</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-blue-100">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">No credit check</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Unlimited miles</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">24/7 support</span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Connect</h2>
              <ul className="mt-4 space-y-3 text-sm text-blue-200">
                <li><a href="https://drivegig.co/book" className="inline-flex items-center gap-2 transition hover:text-white">Booking <ArrowUpRight className="h-4 w-4" strokeWidth={STROKE_WIDTH} /></a></li>
                <li><a href="mailto:hello@dlride.com" className="transition hover:text-white">hello@dlride.com</a></li>
                <li><a href="tel:+14049091666" className="transition hover:text-white">(404) 909-1666</a></li>
                <li><a href="https://www.instagram.com/dlride/" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 hover:text-white" aria-label="DLride on Instagram"><InstagramIcon className="h-5 w-5" /></a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-xs text-blue-300">© <span>{year}</span> DLride. All rights reserved. Atlanta, Georgia.</p>
            <div className="flex items-center gap-4 text-xs text-blue-300">
              <button type="button" className="transition hover:text-white">Terms</button>
              <button type="button" className="transition hover:text-white">Privacy</button>
              <button
                type="button"
                className="inline-flex items-center gap-1 transition hover:text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to top <ArrowUp className="h-3.5 w-3.5" strokeWidth={STROKE_WIDTH} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <Script id="engagebay-init" strategy="afterInteractive">
        {`
          var EhAPI = EhAPI || {};
          EhAPI.after_load = function () {
            EhAPI.set_account('s1n89ior4e65bmpmmk156s3f8g', 'dlride');
            EhAPI.execute('rules');
          };
          (function (d, s, f) {
            var sc = document.createElement(s);
            sc.type = 'text/javascript';
            sc.async = true;
            sc.src = f;
            var m = document.getElementsByTagName(s)[0];
            m.parentNode.insertBefore(sc, m);
          })(document, 'script', '//d2p078bqz5urf7.cloudfront.net/jsapi/ehform.js?v' + new Date().getHours());
        `}
      </Script>
    </>
  );
}

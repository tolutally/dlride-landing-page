import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Gauge,
  Menu,
  Route,
  Umbrella,
  Wrench,
} from "lucide-react";
import DeferredHeroVideo from "@/components/DeferredHeroVideo";

export type LandingSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type LandingFaq = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type SeoLandingPageData = {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroNote: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  relatedLinks: RelatedLink[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    tag: string;
  };
};

const benefits = [
  {
    title: "Unlimited miles",
    copy: "Work, commute, and move around Atlanta without counting every mile.",
    icon: Route,
  },
  {
    title: "Maintenance included",
    copy: "Routine maintenance is covered during your rental.",
    icon: Wrench,
  },
  {
    title: "Flexible weekly terms",
    copy: "Rent around the week ahead without taking on a long-term lease.",
    icon: Gauge,
  },
  {
    title: "Insurance included for a fee",
    copy: "Coverage terms, deductibles, limitations, and exclusions are explained in your rental agreement.",
    icon: Umbrella,
  },
];

const vehicles = [
  {
    name: "Chevrolet Malibu",
    image: "/car-photos/PHOTO-chevrolet-malibu-2020-2.jpg",
    use: "Everyday driving & shift commutes",
  },
  {
    name: "Hyundai Elantra",
    image: "/car-photos/hyundai-elantra-1.JPG",
    use: "Gig work & fuel-conscious driving",
  },
  {
    name: "Nissan Altima",
    image: "/car-photos/nissan-altima-1.JPG",
    use: "Longer weekly drives",
  },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 mx-auto w-full max-w-5xl px-3 text-white">
      <div className="relative flex h-14 items-center justify-between rounded-full bg-slate-900/95 px-3 ring-1 ring-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Link href="/" className="flex items-center" aria-label="DLride home">
          <img src="/dlride-logo-white.png" alt="DLride" className="h-10 w-28 object-contain" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Main navigation">
          <Link href="/#available-cars" className="transition hover:text-white">Available Cars</Link>
          <Link href="/#how-it-works" className="transition hover:text-white">How It Works</Link>
          <Link href="/#why-dlride" className="transition hover:text-white">Why DLride</Link>
          <Link href="/faq" className="transition hover:text-white">FAQ</Link>
        </nav>
        <Link href="/apply" className="hidden h-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-white/10 to-white/5 px-6 text-sm font-medium text-white/90 shadow-lg backdrop-blur-xl transition hover:from-white/15 hover:to-white/10 md:inline-flex">
          Apply for a Car
        </Link>
        <details className="group md:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-full p-2 transition hover:bg-white/10" aria-label="Toggle navigation">
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </summary>
          <nav className="absolute left-3 right-3 top-16 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl" aria-label="Mobile navigation">
            <Link href="/#available-cars" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Available Cars</Link>
            <Link href="/#how-it-works" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">How It Works</Link>
            <Link href="/#why-dlride" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Why DLride</Link>
            <Link href="/faq" className="block rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">FAQ</Link>
            <Link href="/apply" className="mt-2 block rounded-full bg-[#2F5FAF] px-4 py-3 text-center text-sm font-semibold text-white">Apply for a Car</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-gradient-to-br from-[#0b1422] via-[#122A52] to-[#10343a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-[#7CA3E6]">
              <img src="/dlride-logo-white.png" alt="DLride" className="h-12 w-36 object-contain object-left" />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-200">
              Reliable weekly car rentals in Atlanta for gig, rideshare, and delivery drivers—with unlimited miles and maintenance included.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-blue-100">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">No credit check</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Unlimited miles</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Insurance included for a fee</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Weekly terms</span>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Weekly Rentals For</h2>
            <ul className="mt-4 space-y-3 text-sm text-blue-200">
              <li><Link href="/gig-driver-car-rental-atlanta" className="transition hover:text-white">Gig drivers</Link></li>
              <li><Link href="/uber-car-rental-atlanta" className="transition hover:text-white">Uber drivers</Link></li>
              <li><Link href="/lyft-car-rental-atlanta" className="transition hover:text-white">Lyft drivers</Link></li>
              <li><Link href="/doordash-car-rental-atlanta" className="transition hover:text-white">DoorDash drivers</Link></li>
              <li><Link href="/rideshare-car-rental-atlanta" className="transition hover:text-white">Rideshare drivers</Link></li>
              <li><Link href="/travel-nurse-car-rental-atlanta" className="transition hover:text-white">Travel nurses</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Connect</h2>
            <ul className="mt-4 space-y-3 text-sm text-blue-200">
              <li><Link href="/apply" className="inline-flex items-center gap-2 transition hover:text-white">Apply for a Car <ArrowRight className="h-4 w-4" /></Link></li>
              <li><a href="mailto:hello@dlride.com" className="transition hover:text-white">hello@dlride.com</a></li>
              <li><a href="https://www.instagram.com/dlride/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-blue-300">
          © {new Date().getFullYear()} DLride. All rights reserved. Atlanta, Georgia.
        </div>
      </div>
    </footer>
  );
}

export default function SeoLandingPage({ data }: { data: SeoLandingPageData }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dlride.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.h1,
        item: `https://dlride.com/${data.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Header />
      <main>
        <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <DeferredHeroVideo />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="h-20" aria-hidden="true" />
            <div className="flex flex-col items-center pb-14 pt-14 text-center lg:pt-20">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#7CA3E6]">
                <CarFront className="h-4 w-4" strokeWidth={1.5} /> {data.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {data.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {data.intro}
              </p>
            </div>
            <div className="pb-6 lg:pb-8">
              <div className="grid items-center gap-5 rounded-2xl bg-white px-6 py-5 text-left shadow-2xl shadow-black/40 sm:px-8 md:grid-cols-[1fr_auto] lg:rounded-full">
                <div>
                  <p className="font-semibold text-[#122A52]">Ready for a weekly rental?</p>
                  <p className="mt-1 text-sm text-slate-500">{data.heroNote}</p>
                </div>
                <Link href="/apply" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#2F5FAF] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#264E91]">
                  Apply for a Car <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pb-8 lg:grid-cols-4 lg:pb-12">
              {benefits.map(({ title, copy, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-100"><Icon className="h-5 w-5" strokeWidth={1.5} /></span>
                  <h2 className="mt-4 text-base font-semibold sm:text-lg">{title}</h2>
                  <p className="mt-2 hidden text-sm leading-6 text-white/70 sm:block">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-white py-7 sm:py-9">
          <div className="mx-auto grid max-w-7xl items-center gap-5 px-4 text-center sm:px-6 lg:grid-cols-[1fr_3fr] lg:gap-10 lg:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5FAF]">Built for Atlanta</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-[#122A52] sm:text-2xl">Built for the apps Atlanta drives.</h2>
            </div>
            <div>
              <div className="grid grid-cols-6 items-center gap-3 sm:grid-cols-5" aria-label="Driving platforms">
                <img src="/uber-eats-logo.png" alt="Uber Eats" loading="lazy" className="col-span-2 mx-auto h-12 w-20 rounded-lg object-contain sm:col-span-1" />
                <img src="/doordash-logo-clean.png" alt="DoorDash" loading="lazy" className="col-span-2 mx-auto h-12 w-20 object-contain sm:col-span-1" />
                <img src="/amazon-flex-2.jpeg" alt="Amazon Flex" loading="lazy" className="col-span-2 mx-auto h-20 w-32 object-contain sm:col-span-1" />
                <img src="/instacart-logo-clean.png" alt="Instacart" loading="lazy" className="col-span-2 col-start-2 mx-auto h-12 w-24 object-contain sm:col-span-1 sm:col-start-auto" />
                <img src="/grubhub-logo-clean.png" alt="Grubhub" loading="lazy" className="col-span-2 mx-auto h-12 w-24 object-contain sm:col-span-1" />
              </div>
              <p className="mt-2 text-center text-[10px] leading-relaxed text-slate-400">Platform requirements vary. DLride is not affiliated with or endorsed by the platforms shown.</p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 px-1 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5FAF]">Made for the working week</p>
                <h2 className="mt-3 text-3xl font-medium tracking-tighter text-slate-900 sm:text-4xl lg:text-5xl">
                  A rental that fits <span className="bg-gradient-to-b from-[#7CA3E6] to-[#2F5FAF] bg-clip-text text-transparent">the reason you drive</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">Practical weekly access, clear terms, and the support you need to keep your plans moving.</p>
              </div>
              <Link href="/apply" className="group inline-flex items-center gap-2 pb-1 text-sm font-medium text-[#122A52] transition hover:text-[#2F5FAF]">
                Start your application <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] bg-slate-200 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.22)] md:grid-cols-2 lg:grid-cols-3">
              {data.sections.map((section, index) => {
                const span = index === 1
                  ? "lg:col-span-2"
                  : "";

                return (
                  <article key={section.title} className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-white p-7 transition-colors hover:bg-blue-50/40 sm:p-8 ${span}`}>
                    <div className="relative z-10 max-w-2xl">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-sm font-bold text-[#2F5FAF] transition group-hover:bg-[#2F5FAF] group-hover:text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <CheckCircle2 className="h-6 w-6 text-slate-300 transition group-hover:text-[#7CA3E6]" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-xl font-semibold tracking-tight text-[#122A52] sm:text-2xl">{section.title}</h2>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-500">
                        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </div>

                    <div className="relative z-10 mt-8">
                      {section.points ? (
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {section.points.map((point) => (
                            <li key={point} className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#2F5FAF]" /> {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex items-center gap-3" aria-hidden="true">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#2F5FAF] to-[#55c7d9] transition-all duration-500 group-hover:w-full" /></div>
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#122A52] text-white shadow-lg"><ArrowRight className="h-4 w-4" /></span>
                        </div>
                      )}
                    </div>

                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-100/50 blur-3xl transition group-hover:bg-cyan-100/70" aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#101c2d] px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fb4ff]">Available vehicles</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pick a car that fits your week</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">See current availability during your application. Vehicle models and availability can change.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {vehicles.map((vehicle) => (
                <article key={vehicle.name} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img src={vehicle.image} alt={`${vehicle.name} rental vehicle`} loading="lazy" className="h-64 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8fb4ff]">Weekly rental</p>
                    <h3 className="mt-2 text-2xl font-semibold">{vehicle.name}</h3>
                    <p className="mt-2 text-sm text-slate-300">{vehicle.use}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5FAF]">How it works</p>
              <h2 id="process-heading" className="mt-3 text-3xl font-semibold tracking-tight text-[#122A52] sm:text-4xl">Simple from day one</h2>
              <p className="mt-4 text-slate-600">From needing a car to getting on the road.</p>
            </div>
            <div className="mt-12 grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-3">
              {[
                ["01", "Apply online", "Complete the application with your driver and rental details."],
                ["02", "Application review", "DLride reviews your information and confirms current vehicle availability."],
                ["03", "Pay, pick up, and drive", "Complete your rental, collect your vehicle, and get on the road."],
              ].map(([number, title, copy]) => (
                <article key={number} className="relative pr-5">
                  <span className="text-sm font-bold text-[#2F5FAF]">{number}</span>
                  <h3 className="mt-4 text-xl font-semibold text-[#122A52]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center"><Link href="/apply" className="inline-flex items-center gap-3 rounded-full bg-[#2F5FAF] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#264E91]">Apply for a Car <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5FAF]">Atlanta driver story</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#122A52] sm:text-4xl">A reliable car keeps the week moving</h2>
            </div>
            <figure className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
              <blockquote className="text-lg leading-8 text-slate-700">“{data.testimonial.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div><p className="font-semibold text-[#122A52]">{data.testimonial.name}</p><p className="mt-1 text-sm text-slate-500">{data.testimonial.role}</p></div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2F5FAF]">{data.testimonial.tag}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="faq-heading">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5FAF]">FAQ</p>
              <h2 id="faq-heading" className="mt-3 text-3xl font-semibold tracking-tight text-[#122A52] sm:text-4xl">Before you apply</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">Clear answers about weekly DLride rentals in Atlanta.</p>
            </div>
            <div className="border-t border-slate-200">
              {data.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-slate-200 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                    {faq.question}<span className="text-xl text-[#2F5FAF] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl pr-8 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-50 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-[#122A52]">Explore related weekly rentals</h2>
            <div className="mx-auto mt-7 grid max-w-4xl gap-4 md:grid-cols-2">
              {data.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="group rounded-2xl border border-blue-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg">
                  <span className="flex items-center justify-between font-semibold text-[#122A52]">{link.label}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  <span className="mt-2 block text-sm leading-6 text-slate-500">{link.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0">
            <img src="https://images.pexels.com/photos/1386649/pexels-photo-1386649.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Driver in a car" loading="lazy" className="h-full w-full object-cover md:object-left" />
          </div>
          <div className="absolute inset-0 bg-black/65 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl text-center text-white md:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Weekly rentals in Atlanta</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Ready to get on the road?</h2>
              <p className="mt-5 text-base leading-7 text-white/80">Apply for a reliable weekly car without taking on more commitment than you need.</p>
              <Link
                href="/apply"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold transition hover:bg-blue-50"
                style={{ color: "#122A52" }}
              >
                Apply for a Car <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

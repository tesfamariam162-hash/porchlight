import { Compass, MapPin, Sparkles } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const LIVING_IMAGE = '/building.jpg';
const KITCHEN_IMAGE = '/kitchen.jpg';

export function AboutPage() {
  useDocumentTitle('Our Story — Porchlight Luxury Residences');

  return (
    <div className="bg-white">

      {/* ── 1. EDITORIAL HEADER ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white pb-16 pt-16 sm:pb-24 sm:pt-24 border-b border-slate-200/80">
        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-sky-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                About Porchlight · Established in Bole
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-6xl lg:text-7xl">
              A sanctuary of comfort, style, and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-700">
                peace of mind
              </span>{' '}
              in Addis Ababa.
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Porchlight was founded with a singular conviction: that finding a furnished residence in Addis Ababa should never mean compromising on dependable infrastructure, residential tranquility, or genuine hospitality.
            </p>
          </div>

          {/* Dual-Visual Frame */}
          <div className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-12 md:items-end">
            {/* Large Living Visual (7 cols) */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-navy-950/8 md:col-span-7">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 sm:aspect-[16/11]">
                <img
                  src={LIVING_IMAGE}
                  alt="Porchlight luxury furnished dining and living area"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-navy-950/80 p-4 text-white backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400">The Living Canvas</p>
                  <p className="font-display text-base font-bold text-white sm:text-lg">Warm, Light-Filled Social Spaces</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                  Unit 204
                </span>
              </div>
            </div>

            {/* Secondary Kitchen/Island Visual (5 cols) */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-navy-950/8 md:col-span-5">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 sm:aspect-[16/13]">
                <img
                  src={KITCHEN_IMAGE}
                  alt="Porchlight chef's kitchen with granite island"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-navy-950/80 p-4 text-white backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400">Culinary Craft</p>
                  <p className="font-display text-base font-bold text-white sm:text-lg">Full Chef's Kitchen & Island</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                  Move-in Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PROPERTY BY THE NUMBERS (STAT BAR) ── */}
      <section className="relative -mt-10 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-2xl shadow-navy-950/8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-slate-100">
            {/* Stat 1 */}
            <div className="text-center sm:px-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">24</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-accent">Curated Residences</p>
              <p className="mt-0.5 text-xs text-slate-400">Exclusively in Bole</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center sm:px-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">2 & 3</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-accent">Bedroom Suites</p>
              <p className="mt-0.5 text-xs text-slate-400">Each with 2 Bathrooms</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center sm:px-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">100%</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-accent">Power & Water</p>
              <p className="mt-0.5 text-xs text-slate-400">Uninterrupted Backup</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center sm:px-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">24/7</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-accent">Concierge & Security</p>
              <p className="mt-0.5 text-xs text-slate-400">Guarded Private Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. "THE BOLE NEIGHBORHOOD" FEATURE ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                <Compass className="h-3.5 w-3.5 text-accent" />
                Neighborhood & Address
              </div>

              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
                The Bole Advantage:<br />
                <span className="text-accent">Addis Ababa’s Most Coveted District</span>
              </h2>

              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                Location shapes how you experience a city. Situated in Bole, Porchlight places you in the diplomatic, business, and culinary nexus of the capital, while remaining tucked away on a quiet residential street that shelters you from traffic and commotion.
              </p>

              <p className="text-sm leading-relaxed text-slate-500">
                Stroll to artisan Ethiopian roasters like Tomoca and Kaldi’s, international restaurants, organic supermarkets, and boutique fitness studios. When duty calls, the airport and major multinational headquarters are just minutes away.
              </p>

              {/* Quick feature checklist */}
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <p className="text-xs font-bold text-navy-950">✈️ Bole Int. Airport</p>
                  <p className="text-[11px] text-slate-400">8 minutes direct drive</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <p className="text-xs font-bold text-navy-950">🏛️ UNECA & AU HQ</p>
                  <p className="text-[11px] text-slate-400">10-14 minutes corridor</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <p className="text-xs font-bold text-navy-950">☕ Medhanialem Cafés</p>
                  <p className="text-[11px] text-slate-400">4 minutes walking distance</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <p className="text-xs font-bold text-navy-950">🏥 Premier Healthcare</p>
                  <p className="text-[11px] text-slate-400">Nordic & Korean Hospitals</p>
                </div>
              </div>
            </div>

            {/* Right Map Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-navy-950/8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.677421793918!2d38.78397397483259!3d9.00180039105844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85771a56ea35%3A0xba9aa88b7ce682!2sPorchlight%20apartments!5e0!3m2!1sen!2set!4v1789989139257!5m2!1sen!2set"
                  width="100%"
                  height="340"
                  className="w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Porchlight location map"
                />
                <div className="border-t border-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-xs font-bold text-navy-950">Bole, Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

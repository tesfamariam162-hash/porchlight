import { COMPANY } from '@porchlight/shared';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Check, MapPin, Play, Zap } from 'lucide-react';
import { AmenityCard } from '../../components/apartments/AmenityCard';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { fetchAmenities } from '../../services/amenitiesApi';

const HERO_IMAGE = '/building.jpg';

export function HomePage() {
  useDocumentTitle('Modern furnished apartments in Bole, Addis Ababa');

  const amenitiesQuery = useQuery({
    queryKey: ['amenities'],
    queryFn: fetchAmenities,
  });

  const keyAmenities = (amenitiesQuery.data ?? []).slice(0, 6);

  return (
    <div>
      {/* ── HERO: MODERN SPLIT EDITORIAL ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-200/80">
        {/* Subtle decorative background gradient accents */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-sky-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* ── LEFT COLUMN: TYPOGRAPHY & ACTIONS (6 COLS) ── */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              {/* Sleek sapphire pill badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Bole, Addis Ababa · 24 Furnished Units
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-6xl lg:text-6xl xl:text-7xl">
                Find Your Next<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-700">Home in Bole,</span><br />
                Addis Ababa
              </h1>

              {/* Tagline / Subtitle */}
              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Comfortable apartments designed for your lifestyle — fully furnished, secure, and move-in ready. Experience boutique residential living with premium finishes, private bathrooms, and 24/7 power backup.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:gap-4">
                <Link
                  to="/apartments"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-hover hover:-translate-y-0.5 active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                >
                  Explore Apartments <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/tour"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-navy-950 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  Watch Video Tour
                </Link>
              </div>

              {/* Micro-metric Trust Badges */}
              <div className="grid grid-cols-3 gap-3 border-t border-slate-200/90 pt-6 sm:max-w-lg">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/70">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-950">Move-in Ready</p>
                    <p className="text-[10px] text-slate-400">Fully Furnished</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/70">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-950">24/7 Power</p>
                    <p className="text-[10px] text-slate-400">Generator Backup</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-950">2 & 3 Bedroom</p>
                    <p className="text-[10px] text-slate-400">Private Suites</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: SHOWCASE FRAME (6 COLS - ENLARGED) ── */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/20 via-sky-400/15 to-transparent blur-2xl -z-10" />

                {/* Framed Visual Card (Clean, Unobstructed Image) */}
                <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-navy-950/10">
                  <div className="h-[480px] sm:h-[580px] lg:h-[640px] w-full overflow-hidden bg-slate-100">
                    <img
                      src={HERO_IMAGE}
                      alt="Porchlight Luxury Furnished Apartment in Bole"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FIND YOUR APARTMENT ── */}
      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Choose Your Space</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Find Your Apartment
            </h2>
            <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-accent" />
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 sm:text-base">
              Choose the apartment type that fits your needs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* 2 Bedroom Card */}
            <Link
              to="/apartments/2-bedroom"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-navy-900/20"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
                  alt="2 Bedroom Apartment"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">2 Bedroom</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                      2 Bedroom Apartment
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">Comfortable & modern — ideal for couples or small families.</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/8 text-navy-900 transition group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition group-hover:bg-accent-hover">
                  View Apartments
                </div>
              </div>
            </Link>

            {/* 3 Bedroom Card */}
            <Link
              to="/apartments/3-bedroom"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-navy-900/20"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                  alt="3 Bedroom Apartment"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">3 Bedroom</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                      3 Bedroom Apartment
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">Spacious family home — room to live, work, and grow.</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/8 text-navy-900 transition group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition group-hover:bg-accent-hover">
                  View Apartments
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="bg-white py-10 sm:py-24">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Building Amenities</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Everything You Need
            </h2>
            <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-accent" />
          </div>
          {amenitiesQuery.isLoading ? <LoadingState label="Loading…" /> : null}
          {amenitiesQuery.isError ? <ErrorState onRetry={() => void amenitiesQuery.refetch()} /> : null}
          {keyAmenities.length ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-5">
              {keyAmenities.map((a) => <AmenityCard key={a.id} amenity={a} />)}
            </div>
          ) : null}
        </div>
      </section>

      {/* ── VISIT US ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-24">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Find Us</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">Visit Us in Bole</h2>
            <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-10">
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-8">
              <ul className="space-y-2 text-[11px] sm:space-y-4 sm:text-sm">
                <li className="flex items-start gap-1.5 sm:gap-3">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-accent sm:h-4 sm:w-4" />
                  <span className="font-medium text-slate-700">{COMPANY.address}</span>
                </li>
                <li><a href={`tel:${COMPANY.phone}`} className="font-bold text-navy-900 hover:text-accent">{COMPANY.phone}</a></li>
                <li><a href={`mailto:${COMPANY.email}`} className="font-bold text-navy-900 hover:text-accent">{COMPANY.email}</a></li>
                <li className="text-slate-500">{COMPANY.workingHours}</li>
              </ul>
              <Link
                to="/contact"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent py-1.5 text-[10px] font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-accent-hover sm:mt-6 sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm"
              >
                Get Directions & Contact <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm sm:rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.677421793918!2d38.78397397483259!3d9.00180039105844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85771a56ea35%3A0xba9aa88b7ce682!2sPorchlight%20apartments!5e0!3m2!1sen!2set!4v1789989139257!5m2!1sen!2set"
                width="100%"
                height="180"
                className="h-36 w-full sm:h-[300px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Porchlight location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

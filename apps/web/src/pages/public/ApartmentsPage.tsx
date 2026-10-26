import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const TWO_BED_IMAGE = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80';
const THREE_BED_IMAGE = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';

export function ApartmentsPage() {
  useDocumentTitle('Apartments — Porchlight');

  return (
    <div>
      {/* Cards */}
      <div className="bg-slate-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Select Your Space</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Find Your Apartment
            </h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-accent" />
            <p className="mx-auto mt-3 max-w-md text-slate-500">
              Choose the apartment type that fits your needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 2 Bedroom */}
            <Link
              to="/apartments/2-bedroom"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-navy-900/20"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={TWO_BED_IMAGE}
                  alt="2 Bedroom Apartment"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">2 Bedroom</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                      2 Bedroom Apartment
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Comfortable &amp; modern — ideal for couples or small families.
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/8 text-navy-900 transition group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent py-3 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition group-hover:bg-accent-hover">
                  View Apartments
                </div>
              </div>
            </Link>

            {/* 3 Bedroom */}
            <Link
              to="/apartments/3-bedroom"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-navy-900/20"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={THREE_BED_IMAGE}
                  alt="3 Bedroom Apartment"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">3 Bedroom</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                      3 Bedroom Apartment
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Spacious family home — room to live, work, and grow together.
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/8 text-navy-900 transition group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent py-3 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition group-hover:bg-accent-hover">
                  View Apartments
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

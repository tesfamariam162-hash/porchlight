import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Place your videos in: apps/web/public/videos/
//   2bed-tour.mp4  → 2 bedroom tour
//   3bed-tour.mp4  → 3 bedroom tour

const TOURS = [
  {
    label: '2 Bedroom',
    description: 'Comfortable & modern — ideal for couples or small families.',
    src: '/videos/2bed-tour.mp4',
    link: '/apartments/2-bedroom',
    linkLabel: 'View 2 Bedroom Apartments',
  },
  {
    label: '3 Bedroom',
    description: 'Spacious family home — room to live, work, and grow.',
    src: '/videos/3bed-tour.mp4',
    link: '/apartments/3-bedroom',
    linkLabel: 'View 3 Bedroom Apartments',
  },
];

export function TourPage() {
  useDocumentTitle('Watch the Tour — Porchlight');

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="px-4 pt-16 pb-10 text-center sm:pt-20 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">
          Virtual Experience
        </p>
        <h1 className="mx-auto mt-2 max-w-xl font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
          Watch the Tour
        </h1>
        <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-accent" />
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500 sm:text-base">
          Explore our apartments from the comfort of your home before scheduling a visit.
        </p>
      </div>

      {/* Two parallel video cards — matching bedroom card style */}
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {TOURS.map((tour) => (
            <div
              key={tour.label}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-navy-900/20"
            >
              {/* Video — 9:16 portrait */}
              <div className="relative overflow-hidden bg-navy-950" style={{ aspectRatio: '9/16' }}>
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                >
                  <source src={tour.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Card info — same structure as bedroom cards */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">
                      {tour.label}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-navy-950">
                      {tour.label} Apartment Tour
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500">{tour.description}</p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900/8 text-navy-900 transition group-hover:bg-navy-900 group-hover:text-white">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    to={tour.link}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-accent-hover active:scale-95"
                  >
                    {tour.linkLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

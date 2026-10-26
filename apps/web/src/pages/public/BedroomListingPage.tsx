import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { SkeletonCard } from '../../components/common/LoadingState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { fetchApartments } from '../../services/apartmentsApi';
import { formatPrice } from '../../utils/format';

// ── Helpers ──────────────────────────────────────────────────────────────────
function floorLabel(n: number | null | undefined): string {
  if (n === null || n === undefined || n === 0) return 'Ground Floor';
  const suffix = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
  return `${n}${suffix} Floor`;
}

function primaryImage(images: { url: string; isPrimary: boolean }[]): string {
  return (
    (images.find((i) => i.isPrimary) ?? images[0])?.url ??
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
  );
}

function toYMD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ── Calendar picker ───────────────────────────────────────────────────────────
function CalendarPicker({
  rangeStart,
  rangeEnd,
  onSelect,
}: {
  rangeStart: string;
  rangeEnd: string;
  onSelect: (start: string, end: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleDayClick = (dateStr: string) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      onSelect(dateStr, '');
    } else {
      if (dateStr < rangeStart) {
        onSelect(dateStr, rangeStart);
      } else {
        onSelect(rangeStart, dateStr);
      }
    }
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-72 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-navy-950"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-xs font-bold text-navy-950">
          {MONTHS[viewMonth]} {viewYear}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-navy-950"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-1.5 grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <div key={d} className="text-[10px] font-semibold uppercase text-slate-400">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const dateStr = toYMD(new Date(viewYear, viewMonth, d));
          const isStart = dateStr === rangeStart;
          const isEnd = dateStr === rangeEnd;
          const inRange = !!(rangeStart && rangeEnd && dateStr > rangeStart && dateStr < rangeEnd);
          const isToday = dateStr === toYMD(today);
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDayClick(dateStr)}
              className={[
                'relative rounded-full py-1 text-xs transition',
                isStart || isEnd ? 'bg-accent text-white font-bold shadow-sm shadow-accent/25' : '',
                inRange ? 'bg-accent/15 text-accent font-semibold' : '',
                !isStart && !isEnd && !inRange ? 'hover:bg-slate-100 text-navy-950' : '',
              ].filter(Boolean).join(' ')}
            >
              {d}
              {isToday && !isStart && !isEnd && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
      {rangeStart && (
        <div className="mt-3 border-t border-slate-100 pt-2 text-center text-xs text-slate-500">
          {rangeEnd ? `${rangeStart} → ${rangeEnd}` : `From: ${rangeStart}`}
        </div>
      )}
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
export function BedroomListingPage() {
  const { pathname } = useLocation();
  const bedrooms = pathname.includes('2-bedroom') ? 2 : pathname.includes('3-bedroom') ? 3 : null;
  const label = bedrooms === 2 ? '2 Bedroom' : bedrooms === 3 ? '3 Bedroom' : '';
  const bedroomsParam = bedrooms === 2 ? '2-bedroom' : '3-bedroom';

  useDocumentTitle(`${label} Apartments in Bole — Porchlight`);

  const [floorFilter, setFloorFilter] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [calStart, setCalStart] = useState('');
  const [calEnd, setCalEnd] = useState('');
  const [calOpen, setCalOpen] = useState(false);

  const query = useQuery({
    queryKey: ['apartments', 'bedroom-listing', bedrooms],
    queryFn: () => fetchApartments({ bedrooms: bedrooms ?? undefined }),
    enabled: bedrooms !== null,
  });

  const floors = useMemo(() => {
    const set = new Set<number>();
    (query.data ?? []).forEach((a) => {
      if (a.floor !== null && a.floor !== undefined) set.add(a.floor);
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [query.data]);

  const floorOptions = [
    { value: '', label: 'All Floors' },
    ...floors.map((f) => ({ value: String(f), label: floorLabel(f) })),
  ];

  const filtered = useMemo(() => {
    let list = query.data ?? [];

    if (floorFilter !== '') {
      list = list.filter((a) => String(a.floor ?? 0) === floorFilter);
    }

    if (availableOnly) {
      list = list.filter((a) => a.availabilityStatus === 'Available');
    }

    if (calStart) {
      const cutoff = new Date(calEnd || calStart);
      cutoff.setHours(23, 59, 59, 999);
      list = list.filter((a) => {
        if (a.availabilityStatus === 'Occupied') return false;
        if (!a.availableFrom) return true;
        return new Date(a.availableFrom) <= cutoff;
      });
    }

    return list;
  }, [query.data, floorFilter, availableOnly, calStart, calEnd]);

  const hasFilters = !!(floorFilter || availableOnly || calStart);
  const resetFilters = () => {
    setFloorFilter('');
    setAvailableOnly(false);
    setCalStart('');
    setCalEnd('');
  };

  if (bedrooms === null) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Invalid bedroom type.</p>
        <Link to="/apartments" className="mt-4 inline-block text-accent underline">
          Back to all apartments
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── 1. HEADER: SUBTLE ICE CANVAS & BEDROOM SWITCHER ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-slate-50/40 border-b border-slate-200/80 pt-10 pb-16 sm:pt-14 sm:pb-22">
        {/* Subtle decorative glow accents */}
        <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-sky-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Left Content */}
            <div className="space-y-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-navy-950"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
              </Link>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent shadow-xs">
                  <Sparkles className="h-3 w-3" /> Bole Residences · Addis Ababa
                </span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
                {label}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-700">
                  Apartments
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Curated, fully furnished {label.toLowerCase()} residences with private bathrooms, 24/7 dedicated generator power backup, reserve water storage, and assigned parking.
              </p>
            </div>

            {/* Instant Bedroom Switcher Pill */}
            <div className="flex flex-col items-start gap-2 md:items-end">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Switch Residence Type
              </span>
              <div className="inline-flex items-center rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-md shadow-navy-950/5">
                <Link
                  to="/apartments/2-bedroom"
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    bedrooms === 2
                      ? 'bg-navy-950 text-white shadow-md'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  <BedDouble className="h-4 w-4" />
                  2 Bedroom
                </Link>
                <Link
                  to="/apartments/3-bedroom"
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    bedrooms === 3
                      ? 'bg-navy-950 text-white shadow-md'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  <BedDouble className="h-4 w-4" />
                  3 Bedroom
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FLOATING FILTER BAR (OPTION 1) ── */}
      <div className="sticky top-[57px] z-30 -mt-8 sm:-mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-xl shadow-navy-950/10 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">

              {/* Filtering Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Floor Quick-Pills */}
                <div className="flex items-center gap-1.5">
                  <span className="hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 lg:inline-flex mr-1">
                    <Building2 className="h-3.5 w-3.5 text-accent" />
                    Floor:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {floorOptions.map((opt) => {
                      const isActive = floorFilter === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFloorFilter(opt.value)}
                          className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-accent text-white shadow-md shadow-accent/25 scale-[1.02]'
                              : 'border border-slate-200/80 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-200 hidden sm:block mx-0.5" />

                {/* "Available Now" Toggle Pill */}
                <button
                  type="button"
                  onClick={() => setAvailableOnly((v) => !v)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    availableOnly
                      ? 'border border-emerald-300 bg-emerald-50 text-emerald-800 shadow-sm'
                      : 'border border-slate-200/80 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      availableOnly ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  Available Now
                </button>

                {/* Move-in Date Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCalOpen((v) => !v)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      calStart
                        ? 'border border-accent bg-accent/10 text-accent shadow-sm'
                        : 'border border-slate-200/80 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    <span>
                      {calStart && calEnd
                        ? `${calStart} → ${calEnd}`
                        : calStart
                        ? `From: ${calStart}`
                        : 'Move-in Date'}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-slate-400 transition-transform ${calOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Calendar Popover + Backdrop */}
                  {calOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setCalOpen(false)}
                      />
                      <div className="absolute left-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                        <CalendarPicker
                          rangeStart={calStart}
                          rangeEnd={calEnd}
                          onSelect={(s, e) => {
                            setCalStart(s);
                            setCalEnd(e);
                          }}
                        />
                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setCalStart('');
                              setCalEnd('');
                            }}
                            className="text-xs font-semibold text-slate-500 hover:text-navy-950"
                          >
                            Reset Date
                          </button>
                          <button
                            type="button"
                            onClick={() => setCalOpen(false)}
                            className="rounded-lg bg-accent px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-accent-hover"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Reset Filters */}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-400 hover:text-navy-950"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Right Side: Live Results Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-navy-950 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {filtered.length} {filtered.length === 1 ? 'Residence' : 'Residences'} Available
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── 3. LISTINGS GRID ── */}
      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {query.isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : query.isError ? (
            <ErrorState onRetry={() => void query.refetch()} />
          ) : filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((apt) => (
                <Link
                  key={apt.id}
                  to={`/apartments/${apt.id}`}
                  state={{
                    backLabel: `${label} Apartments`,
                    backTo: `/apartments/${bedroomsParam}`,
                  }}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={primaryImage(apt.images)}
                      alt={apt.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3">
                      <StatusBadge status={apt.availabilityStatus} availableFrom={apt.availableFrom} />
                    </div>
                    {apt.floor !== null && apt.floor !== undefined && (
                      <div className="absolute right-3 bottom-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                        {floorLabel(apt.floor)}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-bold text-navy-950 transition-colors group-hover:text-accent">
                          {apt.name}
                        </h3>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">Unit {apt.number}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent">
                        {apt.bedrooms} Bed
                      </span>
                    </div>

                    <p className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {apt.location}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-1 rounded-xl bg-slate-50 px-2.5 py-2">
                        <BedDouble className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-navy-950">{apt.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-xl bg-slate-50 px-2.5 py-2">
                        <Bath className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-navy-950">{apt.bathrooms} Baths</span>
                      </div>
                      {apt.size ? (
                        <div className="flex items-center gap-1 rounded-xl bg-slate-50 px-2.5 py-2">
                          <Maximize2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-navy-950">{apt.size} m²</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <p className="font-display text-lg font-extrabold text-navy-950">
                          {formatPrice(apt.price)}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          / month
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white shadow-sm shadow-accent/25 transition-all group-hover:bg-accent-hover group-hover:-translate-y-0.5">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <EmptyState message={`No ${label.toLowerCase()} apartments match your filters.`} />
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" /> Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

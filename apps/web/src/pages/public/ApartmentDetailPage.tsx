import { COMPANY } from '@porchlight/shared';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Bath, BedDouble, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getAmenityIcon } from '../../utils/amenityIcons';
import { ImageGallery } from '../../components/apartments/ImageGallery';
import { InquiryForm } from '../../components/forms/InquiryForm';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatPrice } from '../../utils/format';
import { fetchApartment } from '../../services/apartmentsApi';

export function ApartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const query = useQuery({
    queryKey: ['apartment', id],
    queryFn: () => fetchApartment(id!),
    enabled: Boolean(id),
  });

  useDocumentTitle(query.data ? `${query.data.name} — Unit ${query.data.number}` : 'Apartment details');

  if (query.isLoading) return <LoadingState label="Loading apartment details…" />;
  if (query.isError || !query.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <ErrorState message="We could not load this apartment." onRetry={() => void query.refetch()} />
        <Link to="/apartments" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-navy-950 px-6 py-3 text-sm font-semibold text-white shadow">
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>
      </div>
    );
  }

  const apt = query.data;

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        to="/apartments"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy-950"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>All Apartments</span>
      </Link>

      <ImageGallery images={apt.images} />

      <div className="mt-6 grid grid-cols-3 gap-3 sm:mt-10 sm:gap-10">
        {/* Main content */}
        <div className="col-span-2 space-y-4 sm:space-y-8">
          {/* Title block */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{apt.name}</h1>
                <p className="mt-1 text-sm font-medium text-slate-400">Unit {apt.number} · {apt.type}</p>
              </div>
              <StatusBadge status={apt.availabilityStatus} availableFrom={apt.availableFrom} />
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
              <MapPin className="h-4 w-4 text-accent shrink-0" />
              {apt.location}
              {apt.floor != null ? <span className="text-slate-300">·</span> : null}
              {apt.floor != null ? <span className="text-slate-600">Floor {apt.floor}</span> : null}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                { label: `${apt.bedrooms} ${apt.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`, icon: BedDouble },
                { label: `${apt.bathrooms} ${apt.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}`, icon: Bath },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  <Icon className="h-4 w-4 text-navy-800" />
                  {label}
                </span>
              ))}
              {apt.size ? (
                <span className="inline-flex items-center rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700">
                  {apt.size} m²
                </span>
              ) : null}
              <span className="inline-flex items-center rounded-2xl border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-bold text-accent shadow-sm">
                {formatPrice(apt.price)}<span className="text-xs font-normal text-slate-500 ml-1">/month</span>
              </span>
            </div>
          </div>

          {/* Facilities */}
          {apt.amenities.length ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
              <h2 className="font-display text-xl font-bold tracking-tight text-navy-950">Features & Amenities</h2>
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {apt.amenities.map((a) => {
                  const Icon = getAmenityIcon(a.icon ?? a.slug);
                  return (
                    <li
                      key={a.id}
                      className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all duration-200 hover:border-navy-950/20 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950/8 text-navy-800 transition-colors group-hover:bg-navy-950 group-hover:text-white">
                        <Icon className="h-4 w-4" aria-hidden />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{a.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {/* Map */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.677421793918!2d38.78397397483259!3d9.00180039105844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85771a56ea35%3A0xba9aa88b7ce682!2sPorchlight%20apartments!5e0!3m2!1sen!2set!4v1789989139257!5m2!1sen!2set"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Porchlight Apartments location"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Inquiry form — first */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-navy-950">Send an Inquiry</h2>
            <p className="mt-1 text-xs text-slate-500">Fill out your details to schedule a viewing or request pricing info.</p>
            <div className="mt-5">
              <InquiryForm defaultApartmentId={apt.id} />
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}

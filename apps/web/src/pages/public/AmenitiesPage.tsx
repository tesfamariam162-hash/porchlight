import { useQuery } from '@tanstack/react-query';
import { AmenityCard } from '../../components/apartments/AmenityCard';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingState } from '../../components/common/LoadingState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { fetchAmenities } from '../../services/amenitiesApi';

export function AmenitiesPage() {
  useDocumentTitle('Amenities');
  const query = useQuery({ queryKey: ['amenities'], queryFn: fetchAmenities });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-accent">Curated Comforts</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">Amenities &amp; Facilities</h1>
        <div className="mt-2.5 h-1 w-12 rounded-full bg-accent" />
        <p className="mt-3 max-w-2xl text-slate-500">
          Everything designed to elevate your everyday living at Porchlight in Bole, Addis Ababa.
        </p>
      </div>
      <div className="mt-10">
        {query.isLoading ? <LoadingState /> : null}
        {query.isError ? <ErrorState onRetry={() => void query.refetch()} /> : null}
        {query.data?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {query.data.map((a) => (
              <AmenityCard key={a.id} amenity={a} />
            ))}
          </div>
        ) : query.isSuccess ? (
          <EmptyState message="No amenities listed yet." />
        ) : null}
      </div>
    </div>
  );
}

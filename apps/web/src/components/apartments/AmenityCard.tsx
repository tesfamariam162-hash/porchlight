import type { AmenityDto } from '@porchlight/shared';
import { getAmenityIcon } from '../../utils/amenityIcons';

export function AmenityCard({ amenity }: { amenity: AmenityDto }) {
  const Icon = getAmenityIcon(amenity.icon ?? amenity.slug);
  return (
    <div className="group flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition-all duration-200 hover:border-navy-900/20 hover:shadow-md sm:gap-4 sm:rounded-2xl sm:p-5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white sm:h-11 sm:w-11 sm:rounded-xl">
        <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <h3 className="text-[11px] font-bold leading-tight text-navy-950 sm:text-base">{amenity.name}</h3>
        {amenity.description ? (
          <p className="mt-0.5 line-clamp-2 text-[9px] leading-relaxed text-slate-500 sm:mt-1 sm:line-clamp-none sm:text-sm">{amenity.description}</p>
        ) : null}
      </div>
    </div>
  );
}

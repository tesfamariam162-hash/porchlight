import { AVAILABILITY_STATUSES } from '@porchlight/shared';
import type { AmenityDto } from '@porchlight/shared';

export interface ApartmentFilterState {
  search: string;
  type: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  minPrice: string;
  maxPrice: string;
  availabilityStatus: string;
  amenityIds: string[];
  sort: string;
}

export const defaultFilters: ApartmentFilterState = {
  search: '',
  type: '',
  location: '',
  bedrooms: '',
  bathrooms: '',
  minPrice: '',
  maxPrice: '',
  availabilityStatus: '',
  amenityIds: [],
  sort: 'price_asc',
};

interface Props {
  filters: ApartmentFilterState;
  amenities: AmenityDto[];
  onChange: (next: ApartmentFilterState) => void;
}

export function ApartmentFilters({ filters, amenities, onChange }: Props) {
  const set = (partial: Partial<ApartmentFilterState>) => onChange({ ...filters, ...partial });

  const toggleAmenity = (id: string) => {
    const next = filters.amenityIds.includes(id)
      ? filters.amenityIds.filter((x) => x !== id)
      : [...filters.amenityIds, id];
    set({ amenityIds: next });
  };

  return (
    <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-24">
      <h2 className="font-semibold text-navy-900">Search & filters</h2>
      <label className="block text-sm">
        <span className="mb-1 block text-slate-600">Search</span>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
          placeholder="Name, number, location…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600">Type</span>
          <input
            value={filters.type}
            onChange={(e) => set({ type: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g. 2 Bedroom"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600">Location</span>
          <input
            value={filters.location}
            onChange={(e) => set({ location: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600">Bedrooms</span>
          <input
            type="number"
            min={0}
            value={filters.bedrooms}
            onChange={(e) => set({ bedrooms: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600">Bathrooms</span>
          <input
            type="number"
            min={0}
            value={filters.bathrooms}
            onChange={(e) => set({ bathrooms: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600">Min price</span>
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600">Max price</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-slate-600">Availability</span>
        <select
          value={filters.availabilityStatus}
          onChange={(e) => set({ availabilityStatus: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          {AVAILABILITY_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend className="mb-2 text-sm text-slate-600">Facilities</legend>
        <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
          {amenities.map((a) => (
            <label key={a.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.amenityIds.includes(a.id)}
                onChange={() => toggleAmenity(a.id)}
              />
              {a.name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm">
        <span className="mb-1 block text-slate-600">Sort by</span>
        <select
          value={filters.sort}
          onChange={(e) => set({ sort: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="name_asc">Name</option>
          <option value="availability">Availability</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() => onChange({ ...defaultFilters })}
        className="w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 hover:bg-white"
      >
        Reset filters
      </button>
    </aside>
  );
}





































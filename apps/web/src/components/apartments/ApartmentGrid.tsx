import type { ApartmentListItemDto } from '@porchlight/shared';
import { ApartmentCard } from './ApartmentCard';

export function ApartmentGrid({ apartments }: { apartments: ApartmentListItemDto[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-6">
      {apartments.map((a) => (
        <ApartmentCard key={a.id} apartment={a} />
      ))}
    </div>
  );
}



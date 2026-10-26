import type { AmenityDto } from '@porchlight/shared';
import { apiClient } from '../lib/apiClient';

export async function fetchAmenities(): Promise<AmenityDto[]> {
  const { data } = await apiClient.get<AmenityDto[]>('/amenities');
  return data;
}

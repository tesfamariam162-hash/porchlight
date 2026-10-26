import type { ApartmentDetailDto, ApartmentListItemDto } from '@porchlight/shared';
import { apiClient } from '../lib/apiClient';

export interface ApartmentQueryParams {
  search?: string;
  type?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  availabilityStatus?: string;
  amenityIds?: string[];
  sort?: string;
  includeArchived?: boolean;
}

export async function fetchApartments(params?: ApartmentQueryParams): Promise<ApartmentListItemDto[]> {
  const { data } = await apiClient.get<ApartmentListItemDto[]>('/apartments', {
    params: {
      ...params,
      amenityIds: params?.amenityIds?.join(','),
    },
  });
  return data;
}

export async function fetchApartment(id: string): Promise<ApartmentDetailDto> {
  const { data } = await apiClient.get<ApartmentDetailDto>(`/apartments/${id}`);
  return data;
}

export async function createApartment(payload: Record<string, unknown>): Promise<ApartmentDetailDto> {
  const { data } = await apiClient.post<ApartmentDetailDto>('/apartments', payload);
  return data;
}

export async function updateApartment(id: string, payload: Record<string, unknown>): Promise<ApartmentDetailDto> {
  const { data } = await apiClient.put<ApartmentDetailDto>(`/apartments/${id}`, payload);
  return data;
}

export async function archiveApartment(id: string): Promise<void> {
  await apiClient.delete(`/apartments/${id}`);
}

export async function deleteApartment(id: string): Promise<void> {
  await apiClient.delete(`/apartments/${id}/permanent`);
}

import type { CustomerDto } from '@porchlight/shared';
import { apiClient } from '../lib/apiClient';

export interface CustomerDetail extends CustomerDto {
  inquiries: {
    id: string;
    subject: string;
    status: string;
    createdAt: string;
    apartment: { id: string; name: string; number: string } | null;
  }[];
}

export async function fetchCustomers(search?: string): Promise<CustomerDto[]> {
  const { data } = await apiClient.get<CustomerDto[]>('/customers', { params: { search } });
  return data;
}

export async function fetchCustomer(id: string): Promise<CustomerDetail> {
  const { data } = await apiClient.get<CustomerDetail>(`/customers/${id}`);
  return data;
}

export async function createCustomer(
  payload: { name: string; email: string; phone: string; notes?: string },
): Promise<CustomerDto> {
  const { data } = await apiClient.post<CustomerDto>('/customers', payload);
  return data;
}

export async function deleteCustomer(id: string): Promise<void> {
  await apiClient.delete(`/customers/${id}`);
}

export async function updateCustomer(
  id: string,
  payload: { name: string; email: string; phone: string; notes?: string | null },
): Promise<CustomerDto> {
  const { data } = await apiClient.put<CustomerDto>(`/customers/${id}`, payload);
  return data;
}

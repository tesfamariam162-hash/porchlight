import type { DashboardStatsDto } from '@porchlight/shared';
import { apiClient } from '../lib/apiClient';

export async function fetchDashboardStats(): Promise<DashboardStatsDto> {
  const { data } = await apiClient.get<DashboardStatsDto>('/dashboard/stats');
  return data;
}

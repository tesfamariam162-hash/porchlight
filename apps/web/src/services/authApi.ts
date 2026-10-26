import type { AuthLoginResponse } from '@porchlight/shared';
import { apiClient } from '../lib/apiClient';

export async function loginAdmin(email: string, password: string): Promise<AuthLoginResponse> {
  const { data } = await apiClient.post<AuthLoginResponse>('/auth/login', { email, password });
  return data;
}

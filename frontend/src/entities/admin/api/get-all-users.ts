import { client } from '@/shared/api';
import type { AdminUser } from '../model/admin.types';

export interface GetAllUsersParams {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface GetAllUsersResponse {
  data: AdminUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getAllUsers(
  params: GetAllUsersParams = {}
): Promise<GetAllUsersResponse> {
  const response = await client.get<{ data: GetAllUsersResponse }>('/admin/users', {
    params,
  });
  return response.data.data; // Unwrap the nested data
}

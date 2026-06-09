import { client } from '@/shared/api';
import type { AdminEducationalResource } from '../model';

export interface GetAllResourcesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetAllResourcesResponse {
  data: AdminEducationalResource[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getAllResources(
  params: GetAllResourcesParams = {},
): Promise<GetAllResourcesResponse> {
  const response = await client.get<{ data: GetAllResourcesResponse }>('/admin/resources', {
    params,
  });
  
  return response.data.data;
}

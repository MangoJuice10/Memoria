import { client } from '@/shared/api';
import type { AdminTag } from '../model';

export interface GetAllTagsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetAllTagsResponse {
  data: AdminTag[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getAllTags(
  params: GetAllTagsParams = {},
): Promise<GetAllTagsResponse> {
  const response = await client.get<{ data: GetAllTagsResponse }>('/admin/tags', {
    params,
  });
  
  return response.data.data;
}

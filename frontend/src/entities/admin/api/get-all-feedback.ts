import { client } from '@/shared/api';
import type { AdminFeedback } from '../model';

export interface GetAllFeedbackParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetAllFeedbackResponse {
  data: AdminFeedback[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getAllFeedback(
  params: GetAllFeedbackParams = {},
): Promise<GetAllFeedbackResponse> {
  const response = await client.get<{ data: GetAllFeedbackResponse }>('/admin/feedback', {
    params,
  });
  
  return response.data.data;
}

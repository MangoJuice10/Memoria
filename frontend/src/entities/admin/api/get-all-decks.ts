import { client } from '@/shared/api';
import type { AdminDeck } from '../model/admin.types';

export interface GetAllDecksParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetAllDecksResponse {
  data: AdminDeck[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getAllDecks(
  params: GetAllDecksParams = {}
): Promise<GetAllDecksResponse> {
  const response = await client.get<{ data: GetAllDecksResponse }>('/admin/decks', {
    params,
  });
  return response.data.data; // Unwrap the nested data
}

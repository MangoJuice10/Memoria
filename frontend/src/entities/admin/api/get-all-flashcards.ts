import { client } from '@/shared/api';
import type { AdminFlashcard } from '../model';

export type GetAllFlashcardsParams = {
  search?: string;
  deckId?: number;
  page?: number;
  limit?: number;
};

export type GetAllFlashcardsResponse = {
  data: AdminFlashcard[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getAllFlashcards(
  params: GetAllFlashcardsParams = {},
): Promise<GetAllFlashcardsResponse> {
  const response = await client.get<{ data: GetAllFlashcardsResponse }>('/admin/flashcards', {
    params,
  });
  return response.data.data; // Unwrap the nested data
}

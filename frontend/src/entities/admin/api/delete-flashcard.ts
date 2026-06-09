import { client } from '@/shared/api';

export async function deleteFlashcard(flashcardId: number): Promise<void> {
  await client.delete(`/admin/flashcards/${flashcardId}`);
}

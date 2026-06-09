import { client } from '@/shared/api';

export async function deleteDeck(deckId: number): Promise<void> {
  await client.delete(`/admin/decks/${deckId}`);
}

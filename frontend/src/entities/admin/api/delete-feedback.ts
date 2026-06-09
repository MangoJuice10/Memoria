import { client } from '@/shared/api';

export async function deleteFeedback(feedbackId: number): Promise<void> {
  await client.delete(`/admin/feedback/${feedbackId}`);
}

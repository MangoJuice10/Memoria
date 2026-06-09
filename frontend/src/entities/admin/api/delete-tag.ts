import { client } from '@/shared/api';

export async function deleteTag(tagId: number): Promise<void> {
  await client.delete(`/admin/tags/${tagId}`);
}

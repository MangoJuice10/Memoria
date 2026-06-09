import { client } from '@/shared/api';

export async function deleteResource(resourceId: number): Promise<void> {
  await client.delete(`/admin/resources/${resourceId}`);
}

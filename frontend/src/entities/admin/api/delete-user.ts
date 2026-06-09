import { client } from '@/shared/api';

export async function deleteUser(userId: number): Promise<void> {
  await client.delete(`/admin/users/${userId}`);
}

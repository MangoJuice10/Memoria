import { client } from '@/shared/api';
import type { AdminUser } from '../model/admin.types';

export interface UpdateUserPayload {
  username?: string;
  email?: string;
}

export async function updateUser(
  userId: number,
  payload: UpdateUserPayload
): Promise<AdminUser> {
  const response = await client.put<{ data: AdminUser }>(
    `/admin/users/${userId}`,
    payload
  );
  return response.data.data; // Unwrap the nested data
}

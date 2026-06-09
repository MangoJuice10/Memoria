import { client } from '@/shared/api/client';
import type { SuccessResponse } from '@/shared/api';
import type { Role } from '../model/admin.types';

export async function assignRole(userId: number, roleName: Role): Promise<{ message: string }> {
  const { data: { data } } = await client.post<SuccessResponse<{ message: string }>>(
    `/rbac/users/${userId}/roles`,
    { roleName }
  );
  return data;
}

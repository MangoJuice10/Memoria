import { client } from '@/shared/api/client';
import type { SuccessResponse } from '@/shared/api';
import type { UserPermissions } from '../model/admin.types';

export async function getMyPermissions(): Promise<UserPermissions> {
  const { data: { data } } = await client.get<SuccessResponse<UserPermissions>>('/rbac/me/permissions');
  return data;
}

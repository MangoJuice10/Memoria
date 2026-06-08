import { SetMetadata } from '@nestjs/common';
import { PermissionCheck } from '../types';

export const PERMISSION_KEY = 'permission';

export const RequiresPermission = (
  resource: string,
  action: string,
  scope: string = 'own',
) => SetMetadata(PERMISSION_KEY, { resource, action, scope } as PermissionCheck);

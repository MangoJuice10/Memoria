import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../services/authorization.service';
import { PERMISSION_KEY } from '../decorators/requires-permission.decorator';
import { PermissionCheck } from '../types';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<PermissionCheck>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasPermission = await this.authorizationService.hasPermission(
      user.id,
      requiredPermission.resource,
      requiredPermission.action,
      requiredPermission.scope,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `You don't have permission to ${requiredPermission.action} ${requiredPermission.resource}`,
      );
    }

    return true;
  }
}

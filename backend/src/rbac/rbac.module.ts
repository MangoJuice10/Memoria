import { Module } from '@nestjs/common';
import { AuthorizationService } from './services/authorization.service';
import { PermissionGuard, RoleGuard } from './guards';
import { RbacController } from './rbac.controller';

@Module({
  controllers: [RbacController],
  providers: [AuthorizationService, PermissionGuard, RoleGuard],
  exports: [AuthorizationService, PermissionGuard, RoleGuard],
})
export class RbacModule {}

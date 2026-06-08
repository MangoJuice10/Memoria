import { Controller, Get, Post, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { AuthorizationService } from './services/authorization.service';
import { RoleGuard } from './guards/role.guard';
import { RequiresRole } from './decorators/requires-role.decorator';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('rbac')
export class RbacController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get('me/permissions')
  async getMyPermissions(@User('id') userId: number) {
    return {
      permissions: await this.authorizationService.getUserPermissions(userId),
      roles: await this.authorizationService.getUserRoles(userId),
      isAdmin: await this.authorizationService.isAdmin(userId),
    };
  }

  @Get('users/:userId/permissions')
  @UseGuards(RoleGuard)
  @RequiresRole('admin')
  async getUserPermissions(@Param('userId') userId: string) {
    return {
      permissions: await this.authorizationService.getUserPermissions(+userId),
      roles: await this.authorizationService.getUserRoles(+userId),
      isAdmin: await this.authorizationService.isAdmin(+userId),
    };
  }

  @Post('users/:userId/roles')
  @UseGuards(RoleGuard)
  @RequiresRole('admin')
  async assignRole(
    @Param('userId') userId: string,
    @Body('roleName') roleName: string,
  ) {
    await this.authorizationService.assignRole(+userId, roleName);
    return {
      message: `Role ${roleName} assigned to user ${userId}`,
    };
  }

  @Delete('users/:userId/roles/:roleName')
  @UseGuards(RoleGuard)
  @RequiresRole('admin')
  async removeRole(
    @Param('userId') userId: string,
    @Param('roleName') roleName: string,
  ) {
    await this.authorizationService.removeRole(+userId, roleName);
    return {
      message: `Role ${roleName} removed from user ${userId}`,
    };
  }
}

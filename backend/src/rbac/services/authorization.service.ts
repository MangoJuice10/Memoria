import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionCheck, UserWithRoles } from '../types';

@Injectable()
export class AuthorizationService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Check if a user has a specific permission
   */
  async hasPermission(
    userId: number,
    resource: string,
    action: string,
    scope: string,
  ): Promise<boolean> {
    const user = await this.getUserWithPermissions(userId);
    
    if (!user) {
      return false;
    }

    return this.checkUserPermission(user, resource, action, scope);
  }

  /**
   * Check if a user has admin role
   */
  async isAdmin(userId: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return false;
    }

    return user.userRoles.some((ur) => ur.role.name === 'admin');
  }

  /**
   * Get all permissions for a user
   */
  async getUserPermissions(userId: number): Promise<PermissionCheck[]> {
    const user = await this.getUserWithPermissions(userId);

    if (!user) {
      return [];
    }

    const permissions: PermissionCheck[] = [];

    for (const userRole of user.userRoles) {
      for (const rolePermission of userRole.role.rolePermissions) {
        permissions.push({
          resource: rolePermission.permission.resource,
          action: rolePermission.permission.action,
          scope: rolePermission.permission.scope,
        });
      }
    }

    return permissions;
  }

  /**
   * Get all roles for a user
   */
  async getUserRoles(userId: number): Promise<string[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return [];
    }

    return user.userRoles.map((ur) => ur.role.name);
  }

  /**
   * Assign a role to a user
   */
  async assignRole(userId: number, roleName: string): Promise<void> {
    const role = await this.prismaService.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    await this.prismaService.userRole.upsert({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
      create: {
        userId,
        roleId: role.id,
      },
      update: {},
    });
  }

  /**
   * Remove a role from a user
   */
  async removeRole(userId: number, roleName: string): Promise<void> {
    const role = await this.prismaService.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    await this.prismaService.userRole.delete({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });
  }

  /**
   * Private helper methods
   */
  private async getUserWithPermissions(userId: number): Promise<UserWithRoles | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  private checkUserPermission(
    user: UserWithRoles,
    resource: string,
    action: string,
    scope: string,
  ): boolean {
    for (const userRole of user.userRoles) {
      for (const rolePermission of userRole.role.rolePermissions) {
        const permission = rolePermission.permission;

        if (
          permission.resource === resource &&
          permission.action === action &&
          permission.scope === scope
        ) {
          return true;
        }
      }
    }

    return false;
  }
}

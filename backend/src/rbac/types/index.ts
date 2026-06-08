export interface PermissionCheck {
  resource: string;
  action: string;
  scope: string;
}

export interface UserWithRoles {
  id: number;
  userRoles: Array<{
    role: {
      id: number;
      name: string;
      rolePermissions: Array<{
        permission: {
          resource: string;
          action: string;
          scope: string;
        };
      }>;
    };
  }>;
}

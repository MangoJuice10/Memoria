import { ref, computed } from 'vue';
import { getMyPermissions } from '../api';
import type { UserPermissions } from './admin.types';

const permissions = ref<UserPermissions | null>(null);
const isLoading = ref(false);
const error = ref<Error | null>(null);

export function useAdminCheck() {
  const isAdmin = computed(() => permissions.value?.isAdmin ?? false);
  const userRoles = computed(() => permissions.value?.roles ?? []);
  const userPermissions = computed(() => permissions.value?.permissions ?? []);

  async function loadPermissions() {
    if (permissions.value !== null) {
      return; // Already loaded
    }

    isLoading.value = true;
    error.value = null;

    try {
      permissions.value = await getMyPermissions();
    } catch (e) {
      error.value = e as Error;
      permissions.value = { permissions: [], roles: ['user'], isAdmin: false };
    } finally {
      isLoading.value = false;
    }
  }

  function resetPermissions() {
    permissions.value = null;
  }

  function hasPermission(resource: string, action: string, scope: string): boolean {
    if (!permissions.value) return false;
    
    return permissions.value.permissions.some(
      (p) => p.resource === resource && p.action === action && p.scope === scope
    );
  }

  function hasRole(role: 'user' | 'admin'): boolean {
    if (!permissions.value) return false;
    return permissions.value.roles.includes(role);
  }

  return {
    isAdmin,
    userRoles,
    userPermissions,
    isLoading,
    error,
    loadPermissions,
    resetPermissions,
    hasPermission,
    hasRole,
  };
}

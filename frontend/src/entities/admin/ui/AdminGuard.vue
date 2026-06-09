<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminCheck } from '../model/use-admin-check';
import { useViewerStore } from '@/entities/viewer';

const router = useRouter();
const { isAdmin, loadPermissions, isLoading } = useAdminCheck();
const viewerStore = useViewerStore();

onMounted(async () => {
  if (!viewerStore.isAuthenticated) {
    router.push({ name: 'login' });
    return;
  }

  await loadPermissions();

  if (!isAdmin.value) {
    router.push({ name: 'home' });
  }
});

watch(() => viewerStore.isAuthenticated, (authenticated) => {
  if (!authenticated) {
    router.push({ name: 'login' });
  }
});
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600">Проверка прав доступа...</p>
    </div>
  </div>
  <div v-else-if="isAdmin">
    <slot />
  </div>
</template>

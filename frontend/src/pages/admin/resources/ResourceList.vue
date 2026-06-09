<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { AdminGuard } from '@/entities/admin';
import { useRouter } from 'vue-router';
import { BackIcon, EducationalResourcesIntroductionIcon, TrashIcon, RefreshIcon, ArrowIcon, Searchbar, Button, IconButton } from '@/shared/ui';
import { getAllResources, deleteResource, type AdminEducationalResource } from '@/entities/admin/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

const router = useRouter();
const queryClient = useQueryClient();

const goBack = () => {
  router.push({ name: 'admin' });
};

// State
const searchQuery = ref('');
const currentPage = ref(1);
const limit = ref(20);

// Query
const { data, isLoading, error, refetch } = useQuery({
  queryKey: computed(() => ['admin-resources', searchQuery.value, currentPage.value, limit.value]),
  queryFn: () => getAllResources({
    search: searchQuery.value || undefined,
    page: currentPage.value,
    limit: limit.value,
  }),
});

// Computed
const resources = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta);

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Mutation
const deleteResourceMutation = useMutation({
  mutationFn: deleteResource,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-resources'] });
  },
});

// Actions
const handleDeleteResource = async (resource: AdminEducationalResource) => {
  if (confirm(`Вы уверены, что хотите удалить ресурс "${resource.name}"?`)) {
    try {
      await deleteResourceMutation.mutateAsync(resource.id);
    } catch (error) {
      console.error('Failed to delete resource:', error);
      alert('Ошибка при удалении ресурса');
    }
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const truncateText = (text: string | null, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const nextPage = () => {
  if (meta.value && currentPage.value < meta.value.totalPages) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <AdminGuard>
    <div class="flex flex-col min-h-screen bg-tertiary">
      <section class="px-page pt-10 pb-10 mb-8">
        <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
          <div class="flex items-start gap-5 mb-6">
            <button 
              @click="goBack"
              class="p-4 rounded-2xl border border-default hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <BackIcon class="icon-static w-7 h-7"/>
            </button>
            <div class="p-4 rounded-2xl border border-default">
              <EducationalResourcesIntroductionIcon class="icon-static w-14"/>
            </div>
            <div class="flex-1">
              <h1 class="text-4xl font-bold tracking-tight">Образовательные ресурсы</h1>
              <p class="mt-2 text-lg text-muted leading-relaxed">
                Управление файлами и ресурсами пользователей
              </p>
            </div>
            <button
              @click="refetch()"
              class="p-4 rounded-2xl border border-default hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Обновить"
            >
              <RefreshIcon class="icon-static w-7 h-7"/>
            </button>
          </div>

          <!-- Search -->
          <div class="mb-6">
            <Searchbar v-model="searchQuery" placeholder="Поиск по названию, описанию или имени файла..."/>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Загрузка ресурсов...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl mb-4">Ошибка при загрузке ресурсов</p>
            <p class="text-base text-muted">{{ error }}</p>
          </div>

          <!-- Resources Table -->
          <div v-else-if="resources.length > 0" class="rounded-2xl border border-default bg-tertiary shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <!-- Grid-based layout -->
              <div class="min-w-[1200px]">
                <!-- Header -->
                <div class="grid grid-cols-[minmax(60px,auto)_minmax(200px,1.5fr)_minmax(180px,1fr)_minmax(180px,1fr)_minmax(120px,auto)_minmax(180px,1fr)_minmax(80px,auto)] gap-4 bg-primary border-b border-default px-6 py-5">
                  <div class="text-base font-semibold">ID</div>
                  <div class="text-base font-semibold">Название</div>
                  <div class="text-base font-semibold">Файл</div>
                  <div class="text-base font-semibold">Владелец</div>
                  <div class="text-base font-semibold">Использований</div>
                  <div class="text-base font-semibold">Дата создания</div>
                  <div class="text-base font-semibold text-center">Действия</div>
                </div>
                
                <!-- Rows -->
                <div
                  v-for="resource in resources"
                  :key="resource.id"
                  class="grid grid-cols-[minmax(60px,auto)_minmax(200px,1.5fr)_minmax(180px,1fr)_minmax(180px,1fr)_minmax(120px,auto)_minmax(180px,1fr)_minmax(80px,auto)] gap-4 border-b border-default hover:bg-primary/50 transition-colors px-6 py-5 items-center"
                >
                  <div class="text-base font-medium">{{ resource.id }}</div>
                  
                  <div class="min-w-0">
                    <div class="font-medium text-base truncate" :title="resource.name">{{ resource.name }}</div>
                    <div class="text-sm text-muted truncate mt-1" :title="resource.description || ''">
                      {{ truncateText(resource.description, 40) }}
                    </div>
                  </div>
                  
                  <div class="text-base truncate" :title="resource.originalFilename">
                    {{ resource.originalFilename }}
                  </div>
                  
                  <div class="min-w-0">
                    <div class="font-medium text-base truncate" :title="resource.user.username">
                      {{ resource.user.username }}
                    </div>
                    <div class="text-sm text-muted truncate" :title="resource.user.email">
                      {{ resource.user.email }}
                    </div>
                  </div>
                  
                  <div class="text-base">
                    {{ resource._count.decks }} колод
                  </div>
                  
                  <div class="text-base text-muted">{{ formatDate(resource.createdAt) }}</div>
                  
                  <div class="flex items-center justify-center">
                    <IconButton 
                      :size-rem="2.3"
                      color-hover-primary="var(--color-primary)"
                      color-active-primary="var(--color-primary)"
                      color-hover-secondary="var(--color-surface-danger)"
                      color-active-secondary="var(--color-surface-danger)"
                      :scale-hover="1.15"
                      :scale-active="1.2"
                      @click="handleDeleteResource(resource)"
                    >
                      <TrashIcon/>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="meta" class="px-6 py-5 bg-primary border-t border-default flex items-center justify-between">
              <div class="text-base text-muted font-medium">
                Показано {{ (meta.page - 1) * meta.limit + 1 }}-{{ Math.min(meta.page * meta.limit, meta.total) }} из {{ meta.total }}
              </div>
              <div class="flex gap-3 items-center">
                <Button
                  @click="prevPage"
                  :enabled="currentPage > 1"
                  class="px-4 py-2.5"
                  :is3D="false"
                >
                  <ArrowIcon class="icon-static-inverse w-6 h-6 rotate-180"/>
                </Button>
                <div class="px-5 py-2.5 text-base font-semibold flex items-center">
                  Страница {{ meta.page }} из {{ meta.totalPages }}
                </div>
                <Button
                  @click="nextPage"
                  :enabled="currentPage < meta.totalPages"
                  class="px-4 py-2.5"
                  :is3D="false"
                >
                  <ArrowIcon class="icon-static-inverse w-6 h-6"/>
                </Button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Ресурсы не найдены</p>
          </div>
        </div>
      </section>
    </div>
  </AdminGuard>
</template>

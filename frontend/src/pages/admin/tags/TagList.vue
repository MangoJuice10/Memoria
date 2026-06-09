<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { AdminGuard } from '@/entities/admin';
import { useRouter } from 'vue-router';
import { BackIcon, TagIcon, TrashIcon, RefreshIcon, ArrowIcon, Searchbar, Button, IconButton } from '@/shared/ui';
import { getAllTags, deleteTag, type AdminTag } from '@/entities/admin/api';
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
  queryKey: computed(() => ['admin-tags', searchQuery.value, currentPage.value, limit.value]),
  queryFn: () => getAllTags({
    search: searchQuery.value || undefined,
    page: currentPage.value,
    limit: limit.value,
  }),
});

// Computed
const tags = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta);

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Mutation
const deleteTagMutation = useMutation({
  mutationFn: deleteTag,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-tags'] });
  },
});

// Actions
const handleDeleteTag = async (tag: AdminTag) => {
  if (confirm(`Вы уверены, что хотите удалить тег "${tag.name}"?`)) {
    try {
      await deleteTagMutation.mutateAsync(tag.id);
    } catch (error) {
      console.error('Failed to delete tag:', error);
      alert('Ошибка при удалении тега');
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
              <TagIcon class="icon-static w-14"/>
            </div>
            <div class="flex-1">
              <h1 class="text-4xl font-bold tracking-tight">Управление тегами</h1>
              <p class="mt-2 text-lg text-muted leading-relaxed">
                Просмотр и удаление тегов для организации колод
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
            <Searchbar v-model="searchQuery" placeholder="Поиск по названию тега..."/>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Загрузка тегов...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl mb-4">Ошибка при загрузке тегов</p>
            <p class="text-base text-muted">{{ error }}</p>
          </div>

          <!-- Tags Table -->
          <div v-else-if="tags.length > 0" class="rounded-2xl border border-default bg-tertiary shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <!-- Grid-based layout -->
              <div class="min-w-[900px]">
                <!-- Header -->
                <div class="grid grid-cols-[minmax(60px,auto)_minmax(250px,2fr)_minmax(150px,1fr)_minmax(80px,auto)] gap-4 bg-primary border-b border-default px-6 py-5">
                  <div class="text-base font-semibold">ID</div>
                  <div class="text-base font-semibold">Название</div>
                  <div class="text-base font-semibold">Использований</div>
                  <div class="text-base font-semibold text-center">Действия</div>
                </div>
                
                <!-- Rows -->
                <div
                  v-for="tag in tags"
                  :key="tag.id"
                  class="grid grid-cols-[minmax(60px,auto)_minmax(250px,2fr)_minmax(150px,1fr)_minmax(80px,auto)] gap-4 border-b border-default hover:bg-primary/50 transition-colors px-6 py-5 items-center"
                >
                  <div class="text-base font-medium">{{ tag.id }}</div>
                  
                  <div class="text-base font-medium truncate" :title="tag.name">
                    {{ tag.name }}
                  </div>
                  
                  <div class="text-base">
                    {{ tag._count.decks }} колод
                  </div>
                  
                  <div class="flex items-center justify-center">
                    <IconButton 
                      :size-rem="2.3"
                      color-hover-primary="var(--color-primary)"
                      color-active-primary="var(--color-primary)"
                      color-hover-secondary="var(--color-surface-danger)"
                      color-active-secondary="var(--color-surface-danger)"
                      :scale-hover="1.15"
                      :scale-active="1.2"
                      @click="handleDeleteTag(tag)"
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
            <p class="text-muted text-xl">Теги не найдены</p>
          </div>
        </div>
      </section>
    </div>
  </AdminGuard>
</template>

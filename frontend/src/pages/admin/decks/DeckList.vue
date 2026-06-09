<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { AdminGuard } from '@/entities/admin';
import { useRouter } from 'vue-router';
import { BackIcon, DecksIntroductionIcon, TrashIcon, RefreshIcon, PublicIcon, PrivateIcon, ArrowIcon, Searchbar, Button, IconButton, IconLabel } from '@/shared/ui';
import { getAllDecks, deleteDeck, type AdminDeck } from '@/entities/admin/api';
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
  queryKey: computed(() => ['admin-decks', searchQuery.value, currentPage.value, limit.value]),
  queryFn: () => getAllDecks({
    search: searchQuery.value || undefined,
    page: currentPage.value,
    limit: limit.value,
  }),
});

// Computed
const decks = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta);

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Mutation
const deleteDeckMutation = useMutation({
  mutationFn: deleteDeck,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-decks'] });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  },
});

// Actions
const handleDeleteDeck = async (deck: AdminDeck) => {
  if (confirm(`Вы уверены, что хотите удалить колоду "${deck.name}"?`)) {
    try {
      await deleteDeckMutation.mutateAsync(deck.id);
    } catch (error) {
      console.error('Failed to delete deck:', error);
      alert('Ошибка при удалении колоды');
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
              <DecksIntroductionIcon class="icon-static w-14"/>
            </div>
            <div class="flex-1">
              <h1 class="text-4xl font-bold tracking-tight">Управление колодами</h1>
              <p class="mt-2 text-lg text-muted leading-relaxed">
                Просмотр и удаление колод всех пользователей
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
            <Searchbar v-model="searchQuery" placeholder="Поиск по названию или описанию..."/>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Загрузка колод...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl mb-4">Ошибка при загрузке колод</p>
            <p class="text-base text-muted">{{ error }}</p>
          </div>

          <!-- Decks Table -->
          <div v-else-if="decks.length > 0" class="rounded-2xl border border-default bg-tertiary shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <!-- Grid-based layout -->
              <div class="min-w-[1200px]">
                <!-- Header -->
                <div class="grid grid-cols-[minmax(60px,auto)_minmax(200px,1.5fr)_minmax(180px,1fr)_minmax(120px,auto)_minmax(140px,1fr)_minmax(180px,1fr)_minmax(80px,auto)] gap-4 bg-primary border-b border-default px-6 py-5">
                  <div class="text-base font-semibold">ID</div>
                  <div class="text-base font-semibold">Название</div>
                  <div class="text-base font-semibold">Владелец</div>
                  <div class="text-base font-semibold">Видимость</div>
                  <div class="text-base font-semibold">Карточки</div>
                  <div class="text-base font-semibold">Дата создания</div>
                  <div class="text-base font-semibold text-center">Действия</div>
                </div>
                
                <!-- Rows -->
                <div
                  v-for="deck in decks"
                  :key="deck.id"
                  class="grid grid-cols-[minmax(60px,auto)_minmax(200px,1.5fr)_minmax(180px,1fr)_minmax(120px,auto)_minmax(140px,1fr)_minmax(180px,1fr)_minmax(80px,auto)] gap-4 border-b border-default hover:bg-primary/50 transition-colors px-6 py-5 items-center"
                >
                  <div class="text-base font-medium">{{ deck.id }}</div>
                  
                  <div class="min-w-0">
                    <div class="font-medium text-base truncate" :title="deck.name">{{ deck.name }}</div>
                    <div class="text-sm text-muted truncate mt-1" :title="deck.description">{{ deck.description }}</div>
                  </div>
                  
                  <div class="min-w-0">
                    <div class="font-medium text-base truncate" :title="deck.user.username">{{ deck.user.username }}</div>
                    <div class="text-sm text-muted truncate" :title="deck.user.email">{{ deck.user.email }}</div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <PublicIcon v-if="deck.isPublic" class="icon-static w-6 h-6 flex-shrink-0"/>
                    <PrivateIcon v-else class="icon-static w-6 h-6 flex-shrink-0"/>
                    <span class="text-base whitespace-nowrap">{{ deck.isPublic ? 'Публичная' : 'Приватная' }}</span>
                  </div>
                  
                  <div class="text-base font-medium">{{ deck._count.flashcards }}</div>
                  
                  <div class="text-base text-muted">{{ formatDate(deck.createdAt) }}</div>
                  
                  <div class="flex items-center justify-center">
                    <IconButton 
                      :size-rem="2.3"
                      color-hover-primary="var(--color-primary)"
                      color-active-primary="var(--color-primary)"
                      color-hover-secondary="var(--color-surface-danger)"
                      color-active-secondary="var(--color-surface-danger)"
                      :scale-hover="1.15"
                      :scale-active="1.2"
                      @click="handleDeleteDeck(deck)"
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
            <p class="text-muted text-xl">Колоды не найдены</p>
          </div>
        </div>
      </section>
    </div>
  </AdminGuard>
</template>

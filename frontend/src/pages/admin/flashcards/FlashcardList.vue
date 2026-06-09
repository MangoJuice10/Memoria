<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { AdminGuard } from '@/entities/admin';
import { useRouter } from 'vue-router';
import { BackIcon, FlashcardsIcon, TrashIcon, RefreshIcon, ArrowIcon, Searchbar, Button, IconButton, IconLabel } from '@/shared/ui';
import { getAllFlashcards, deleteFlashcard, type AdminFlashcard } from '@/entities/admin/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

const router = useRouter();
const queryClient = useQueryClient();

const goBack = () => {
  router.push({ name: 'admin' });
};

// State
const searchQuery = ref('');
const deckFilter = ref<number | undefined>(undefined);
const currentPage = ref(1);
const limit = ref(20);

// Query
const { data, isLoading, error, refetch } = useQuery({
  queryKey: computed(() => ['admin-flashcards', searchQuery.value, deckFilter.value, currentPage.value, limit.value]),
  queryFn: () => getAllFlashcards({
    search: searchQuery.value || undefined,
    deckId: deckFilter.value,
    page: currentPage.value,
    limit: limit.value,
  }),
});

// Computed
const flashcards = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta);

// Reset to page 1 when search/filter changes
watch([searchQuery, deckFilter], () => {
  currentPage.value = 1;
});

// Mutations
const deleteFlashcardMutation = useMutation({
  mutationFn: deleteFlashcard,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-flashcards'] });
  },
});

// Actions
const handleDeleteFlashcard = async (flashcard: AdminFlashcard) => {
  if (confirm(`Вы уверены, что хотите удалить карточку?`)) {
    try {
      await deleteFlashcardMutation.mutateAsync(flashcard.id);
    } catch (error) {
      console.error('Failed to delete flashcard:', error);
      alert('Ошибка при удалении карточки');
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

const truncateText = (text: string, maxLength: number) => {
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
              <FlashcardsIcon class="icon-static w-14"/>
            </div>
            <div class="flex-1">
              <h1 class="text-4xl font-bold tracking-tight">Управление карточками</h1>
              <p class="mt-2 text-lg text-muted leading-relaxed">
                Просмотр и управление всеми карточками в системе
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

          <!-- Filters -->
          <div class="flex gap-4 mb-6">
            <div class="flex-1">
              <Searchbar v-model="searchQuery" placeholder="Поиск по содержанию карточек..."/>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl">Загрузка карточек...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 rounded-2xl border border-default bg-tertiary text-center shadow-lg">
            <p class="text-muted text-xl mb-4">Ошибка при загрузке карточек</p>
            <p class="text-base text-muted">{{ error }}</p>
          </div>

          <!-- Flashcards Table -->
          <div v-else-if="flashcards.length > 0" class="rounded-2xl border border-default bg-tertiary shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <!-- Grid-based layout -->
              <div class="min-w-[1200px]">
                <!-- Header -->
                <div class="grid grid-cols-[minmax(60px,auto)_minmax(250px,2fr)_minmax(250px,2fr)_minmax(180px,1fr)_minmax(120px,auto)_minmax(150px,1fr)_minmax(80px,auto)] gap-4 bg-primary border-b border-default px-6 py-5">
                  <div class="text-base font-semibold">ID</div>
                  <div class="text-base font-semibold">Лицевая сторона</div>
                  <div class="text-base font-semibold">Обратная сторона</div>
                  <div class="text-base font-semibold">Колода</div>
                  <div class="text-base font-semibold">Повторения</div>
                  <div class="text-base font-semibold">Дата создания</div>
                  <div class="text-base font-semibold text-center">Действия</div>
                </div>
                
                <!-- Rows -->
                <div
                  v-for="flashcard in flashcards"
                  :key="flashcard.id"
                  class="grid grid-cols-[minmax(60px,auto)_minmax(250px,2fr)_minmax(250px,2fr)_minmax(180px,1fr)_minmax(120px,auto)_minmax(150px,1fr)_minmax(80px,auto)] gap-4 border-b border-default hover:bg-primary/50 transition-colors px-6 py-5 items-center"
                >
                  <div class="text-base font-medium">{{ flashcard.id }}</div>
                  
                  <div class="text-base truncate" :title="flashcard.front">
                    {{ truncateText(flashcard.front, 60) }}
                  </div>
                  
                  <div class="text-base text-muted truncate" :title="flashcard.back">
                    {{ truncateText(flashcard.back, 60) }}
                  </div>
                  
                  <div class="text-base truncate" :title="flashcard.deck?.name">
                    {{ flashcard.deck?.name || 'N/A' }}
                  </div>
                  
                  <div class="text-base text-center">
                    {{ flashcard.repetitions }}
                  </div>
                  
                  <div class="text-base text-muted">{{ formatDate(flashcard.createdAt) }}</div>
                  
                  <div class="flex items-center justify-center">
                    <IconButton 
                      :size-rem="2.3"
                      color-hover-primary="var(--color-primary)"
                      color-active-primary="var(--color-primary)"
                      color-hover-secondary="var(--color-surface-danger)"
                      color-active-secondary="var(--color-surface-danger)"
                      :scale-hover="1.15"
                      :scale-active="1.2"
                      @click="handleDeleteFlashcard(flashcard)"
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
            <p class="text-muted text-xl">Карточки не найдены</p>
          </div>
        </div>
      </section>
    </div>
  </AdminGuard>
</template>

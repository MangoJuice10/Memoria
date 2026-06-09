<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AdminGuard } from '@/entities/admin';
import { useI18n } from 'vue-i18n';
import { 
  AccountIcon, 
  DecksIntroductionIcon, 
  FlashcardsIcon, 
  StatisticsFeatureIcon,
  TagIcon,
  EducationalResourcesIntroductionIcon,
  DeckFeedbackIcon
} from '@/shared/ui';
import { getStatistics, type Statistics } from '@/entities/admin/api';

const { t } = useI18n();

const stats = ref<Statistics | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    stats.value = await getStatistics();
  } catch (e) {
    console.error('Failed to load statistics:', e);
    error.value = 'Failed to load statistics';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <AdminGuard>
    <div class="flex flex-col min-h-screen bg-tertiary">
      <!-- Admin Header -->
      <section class="px-page pt-10 pb-10 mb-8">
        <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
          <div class="flex items-start justify-between mb-8">
            <div class="flex gap-5">
              <div class="p-4 rounded-2xl border border-default">
                <AccountIcon class="icon-static w-12"/>
              </div>
              <div>
                <h1 class="text-3xl font-bold tracking-tight">Панель Администратора</h1>
                <p class="mt-2 text-base text-muted leading-relaxed">
                  Управление системой и контентом
                </p>
              </div>
            </div>
            <div class="px-4 py-2 rounded-2xl border border-default bg-tertiary text-sm font-semibold">
              ADMIN
            </div>
          </div>

          <!-- Statistics Cards -->
          <div v-if="!isLoading && stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-2xl border border-default bg-tertiary shadow-lg">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl border border-default">
                  <AccountIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="text-sm text-muted">Пользователи</p>
                  <p class="text-2xl font-bold">{{ stats.totalUsers }}</p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl border border-default bg-tertiary shadow-lg">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl border border-default">
                  <DecksIntroductionIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="text-sm text-muted">Колоды</p>
                  <p class="text-2xl font-bold">{{ stats.totalDecks }}</p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl border border-default bg-tertiary shadow-lg">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl border border-default">
                  <FlashcardsIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="text-sm text-muted">Карточки</p>
                  <p class="text-2xl font-bold">{{ stats.totalFlashcards }}</p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl border border-default bg-tertiary shadow-lg">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl border border-default">
                  <StatisticsFeatureIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="text-sm text-muted">Повторений</p>
                  <p class="text-2xl font-bold">{{ stats.totalReviews }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="isLoading" class="text-center py-8 text-muted">
            Загрузка статистики...
          </div>
          
          <div v-if="error" class="p-6 rounded-2xl border border-default bg-tertiary text-center text-muted">
            {{ error }}
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <div class="px-page pb-page">
        <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
          <h2 class="text-2xl font-bold mb-6">Быстрые действия</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link 
              :to="{ name: 'admin-users' }"
              class="group p-6 rounded-2xl border border-default bg-tertiary hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl border border-default group-hover:scale-110 transition-transform">
                  <AccountIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="font-semibold text-lg">Управление пользователями</p>
                  <p class="text-sm text-muted mt-1">Просмотр, редактирование, роли</p>
                </div>
              </div>
            </router-link>

            <router-link 
              :to="{ name: 'admin-decks' }"
              class="group p-6 rounded-2xl border border-default bg-tertiary hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl border border-default group-hover:scale-110 transition-transform">
                  <DecksIntroductionIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="font-semibold text-lg">Управление колодами</p>
                  <p class="text-sm text-muted mt-1">Просмотр, удаление колод</p>
                </div>
              </div>
            </router-link>

            <router-link 
              :to="{ name: 'admin-flashcards' }"
              class="group p-6 rounded-2xl border border-default bg-tertiary hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl border border-default group-hover:scale-110 transition-transform">
                  <FlashcardsIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="font-semibold text-lg">Управление карточками</p>
                  <p class="text-sm text-muted mt-1">Редактирование контента</p>
                </div>
              </div>
            </router-link>

            <router-link 
              :to="{ name: 'admin-tags' }"
              class="group p-6 rounded-2xl border border-default bg-tertiary hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl border border-default group-hover:scale-110 transition-transform">
                  <TagIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="font-semibold text-lg">Управление тегами</p>
                  <p class="text-sm text-muted mt-1">Создание, редактирование тегов</p>
                </div>
              </div>
            </router-link>

            <router-link 
              :to="{ name: 'admin-resources' }"
              class="group p-6 rounded-2xl border border-default bg-tertiary hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl border border-default group-hover:scale-110 transition-transform">
                  <EducationalResourcesIntroductionIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="font-semibold text-lg">Образовательные ресурсы</p>
                  <p class="text-sm text-muted mt-1">Управление файлами</p>
                </div>
              </div>
            </router-link>

            <router-link 
              :to="{ name: 'admin-feedback' }"
              class="group p-6 rounded-2xl border border-default bg-tertiary hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl border border-default group-hover:scale-110 transition-transform">
                  <DeckFeedbackIcon class="icon-static w-6 h-6"/>
                </div>
                <div>
                  <p class="font-semibold text-lg">Отзывы</p>
                  <p class="text-sm text-muted mt-1">Модерация отзывов</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </AdminGuard>
</template>

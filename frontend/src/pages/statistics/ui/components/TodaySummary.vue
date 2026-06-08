<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TodayStats } from '../../model/statistics.types';

const props = defineProps<{
  data: TodayStats;
}>();

const { t } = useI18n();

const ratingColors = {
  AGAIN: 'var(--color-again)',
  BAD: 'var(--color-bad)',
  GOOD: 'var(--color-good)',
  PERFECT: 'var(--color-perfect)',
};

const ratings = computed(() => [
  { key: 'AGAIN', count: props.data.byRating.AGAIN, label: t('statistics.ratings.again') },
  { key: 'BAD', count: props.data.byRating.BAD, label: t('statistics.ratings.bad') },
  { key: 'GOOD', count: props.data.byRating.GOOD, label: t('statistics.ratings.good') },
  { key: 'PERFECT', count: props.data.byRating.PERFECT, label: t('statistics.ratings.perfect') },
]);
</script>

<template>
  <div class="bg-primary rounded-lg border border-default p-6">
    <h2 class="text-xl font-bold mb-6">{{ t('statistics.today.title') }}</h2>
    
    <div v-if="data.reviewCount === 0" class="text-muted text-center py-8">
      {{ t('statistics.today.noReviews') }}
    </div>
    
    <div v-else class="flex flex-col gap-6">
      <div class="text-center">
        <div class="text-4xl font-bold">{{ data.reviewCount }}</div>
        <div class="text-muted">{{ t('statistics.today.reviewsCompleted') }}</div>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="rating in ratings"
          :key="rating.key"
          class="flex flex-col items-center gap-2 p-4 rounded-lg border border-default bg-tertiary"
        >
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-text-inverse"
            :style="{ background: ratingColors[rating.key as keyof typeof ratingColors] }"
          >
            {{ rating.count }}
          </div>
          <div class="text-sm text-muted">{{ rating.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FutureDue } from '../../model/statistics.types';

const props = defineProps<{
  data: FutureDue;
}>();

const { t } = useI18n();

const stats = computed(() => [
  { label: t('statistics.futureDue.total'), value: props.data.total },
  { label: t('statistics.futureDue.average'), value: props.data.average.toFixed(1) },
  { label: t('statistics.futureDue.dueTomorrow'), value: props.data.dueTomorrow },
  { label: t('statistics.futureDue.dailyLoad'), value: props.data.dailyLoad },
]);

const maxCount = computed(() => {
  return Math.max(...props.data.forecast.map(f => f.count), 1);
});

const getBarHeight = (count: number) => {
  return (count / maxCount.value) * 100;
};
</script>

<template>
  <div class="bg-primary rounded-lg border border-default p-6">
    <h2 class="text-xl font-bold mb-6">{{ t('statistics.futureDue.title') }}</h2>
    
    <!-- Stats Summary -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="flex flex-col gap-1 p-4 rounded-lg border border-default bg-tertiary"
      >
        <div class="text-2xl font-bold">{{ stat.value }}</div>
        <div class="text-sm text-muted">{{ stat.label }}</div>
      </div>
    </div>
    
    <!-- Backlog Warning -->
    <div
      v-if="data.backlog > 0"
      class="mb-6 p-4 rounded-lg border border-again bg-again bg-opacity-10 text-again"
    >
      <div class="font-medium">
        {{ t('statistics.futureDue.backlog') }}: {{ data.backlog }} {{ t('statistics.futureDue.overdueCards') }}
      </div>
    </div>
    
    <!-- Simple bar chart for next 30 days -->
    <div v-if="data.forecast.length > 0" class="flex flex-col gap-2">
      <div class="text-sm font-medium text-muted">{{ t('statistics.futureDue.next30Days') }}</div>
      <div class="overflow-x-auto">
        <div class="min-w-[600px] flex items-end gap-1 h-32">
          <div
            v-for="(day, i) in data.forecast.slice(0, 30)"
            :key="i"
            class="flex-1 bg-accent rounded-t transition-all hover:opacity-75 cursor-pointer"
            :style="{ height: `${getBarHeight(day.count)}%` }"
            :title="`${day.date}: ${day.count} cards`"
          />
        </div>
      </div>
    </div>
    
    <div v-else class="text-muted text-center py-8">
      {{ t('statistics.futureDue.noForecast') }}
    </div>
  </div>
</template>

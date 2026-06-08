<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CardCounts } from '../../model/statistics.types';

const props = defineProps<{
  data: CardCounts;
}>();

const { t } = useI18n();

const phases = computed(() => [
  { key: 'NEW', count: props.data.NEW, label: t('statistics.phases.new'), color: '#3b82f6' },
  { key: 'LEARNING', count: props.data.LEARNING, label: t('statistics.phases.learning'), color: '#f59e0b' },
  { key: 'RELEARNING', count: props.data.RELEARNING, label: t('statistics.phases.relearning'), color: '#ef4444' },
  { key: 'YOUNG', count: props.data.YOUNG, label: t('statistics.phases.young'), color: '#10b981' },
  { key: 'MATURE', count: props.data.MATURE, label: t('statistics.phases.mature'), color: '#059669' },
]);

const total = computed(() => props.data.total);

const getPercentage = (count: number) => {
  if (total.value === 0) return 0;
  return Math.round((count / total.value) * 100);
};
</script>

<template>
  <div class="bg-primary rounded-lg border border-default p-6">
    <h2 class="text-xl font-bold mb-6">{{ t('statistics.cardCounts.title') }}</h2>
    
    <div v-if="total === 0" class="text-muted text-center py-8">
      {{ t('statistics.cardCounts.noCards') }}
    </div>
    
    <div v-else class="flex flex-col gap-6">
      <!-- Simple list view with bars -->
      <div class="flex flex-col gap-3">
        <div
          v-for="phase in phases"
          :key="phase.key"
          class="flex items-center gap-3"
        >
          <div class="w-32 text-sm font-medium">{{ phase.label }}</div>
          <div class="flex-1 h-8 rounded-full bg-tertiary overflow-hidden border border-default relative">
            <div
              class="h-full rounded-full transition-all"
              :style="{ width: `${getPercentage(phase.count)}%`, background: phase.color }"
            />
            <div class="absolute inset-0 flex items-center justify-center text-sm font-medium">
              {{ phase.count }} ({{ getPercentage(phase.count) }}%)
            </div>
          </div>
        </div>
      </div>
      
      <!-- Total -->
      <div class="pt-4 border-t border-default flex justify-between items-center">
        <span class="font-medium">{{ t('statistics.cardCounts.total') }}</span>
        <span class="text-2xl font-bold">{{ total }}</span>
      </div>
    </div>
  </div>
</template>

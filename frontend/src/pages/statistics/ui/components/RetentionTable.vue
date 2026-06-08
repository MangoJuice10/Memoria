<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Retention } from '../../model/statistics.types';

const props = defineProps<{
  data: Retention;
}>();

const { t } = useI18n();

const maturityRows = computed(() => [
  { label: t('statistics.retention.young'), ...props.data.young },
  { label: t('statistics.retention.mature'), ...props.data.mature },
  { label: t('statistics.retention.all'), ...props.data.overall },
]);

const periodRows = computed(() => [
  { label: t('statistics.retention.today'), rate: props.data.byPeriod.today },
  { label: t('statistics.retention.yesterday'), rate: props.data.byPeriod.yesterday },
  { label: t('statistics.retention.lastWeek'), rate: props.data.byPeriod.lastWeek },
  { label: t('statistics.retention.lastMonth'), rate: props.data.byPeriod.lastMonth },
  { label: t('statistics.retention.lastYear'), rate: props.data.byPeriod.lastYear },
]);

const getRateColor = (rate: number | null) => {
  if (rate === null) return 'var(--color-text-muted)';
  if (rate >= 90) return 'var(--color-perfect)';
  if (rate >= 80) return 'var(--color-good)';
  if (rate >= 70) return 'var(--color-bad)';
  return 'var(--color-again)';
};

const formatRate = (rate: number | null) => {
  if (rate === null) return 'N/A';
  return `${rate.toFixed(1)}%`;
};
</script>

<template>
  <div class="bg-primary rounded-lg border border-default p-6">
    <h2 class="text-xl font-bold mb-6">{{ t('statistics.retention.title') }}</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- By Maturity -->
      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-muted">{{ t('statistics.retention.byMaturity') }}</h3>
        <div class="border border-default rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-tertiary">
              <tr>
                <th class="text-left p-3 text-sm font-medium">{{ t('statistics.retention.type') }}</th>
                <th class="text-right p-3 text-sm font-medium">{{ t('statistics.retention.rate') }}</th>
                <th class="text-right p-3 text-sm font-medium">{{ t('statistics.retention.count') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in maturityRows"
                :key="i"
                :class="i !== maturityRows.length - 1 ? 'border-b border-default' : ''"
              >
                <td class="p-3">{{ row.label }}</td>
                <td class="p-3 text-right font-bold" :style="{ color: getRateColor(row.rate) }">
                  {{ formatRate(row.rate) }}
                </td>
                <td class="p-3 text-right text-muted">{{ row.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- By Period -->
      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-muted">{{ t('statistics.retention.byPeriod') }}</h3>
        <div class="border border-default rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-tertiary">
              <tr>
                <th class="text-left p-3 text-sm font-medium">{{ t('statistics.retention.period') }}</th>
                <th class="text-right p-3 text-sm font-medium">{{ t('statistics.retention.rate') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in periodRows"
                :key="i"
                :class="i !== periodRows.length - 1 ? 'border-b border-default' : ''"
              >
                <td class="p-3">{{ row.label }}</td>
                <td class="p-3 text-right font-bold" :style="{ color: getRateColor(row.rate) }">
                  {{ formatRate(row.rate) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

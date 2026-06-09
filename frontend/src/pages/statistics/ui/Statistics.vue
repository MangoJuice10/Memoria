<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';
import { getIdRouteParam } from '@/app/router';
import { QueryState, Button } from '@/shared/ui';
import { ArrowIcon, StatisticsFeatureIcon } from '@/shared/ui/icons';
import { getStatistics, type StatisticsPeriod } from '../api/get-statistics';
import TodaySummary from './components/TodaySummary.vue';
import CardCountsPieChart from './components/CardCountsPieChart.vue';
import CalendarHeatmap from './components/CalendarHeatmap.vue';
import FutureDueChart from './components/FutureDueChart.vue';
import RetentionTable from './components/RetentionTable.vue';
import AnswerButtonsChart from './components/AnswerButtonsChart.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const deckId = computed(() => getIdRouteParam(route.params.deckId));
const period = ref<StatisticsPeriod>('1year');

const { data: statistics, isLoading, error, isFetching } = useQuery({
  queryKey: computed(() => ['statistics', deckId.value, period.value]),
  queryFn: async () => {
    console.log('Fetching statistics for deck:', deckId.value, 'period:', period.value);
    const result = await getStatistics(deckId.value, period.value, true);
    console.log('Statistics fetched:', result);
    return result;
  },
  enabled: computed(() => deckId.value > 0),
  staleTime: 30000, // Cache for 30 seconds
});

// Debug watcher
watch([statistics, isLoading, error], ([stats, loading, err]) => {
  console.log('Query state changed:', {
    hasStatistics: !!stats,
    isLoading: loading,
    error: err,
    statistics: stats,
  });
}, { immediate: true });

const goBackToDeck = () => {
  router.push({ name: 'deck-info', params: { deckId: deckId.value } });
};

const periods = computed<Array<{ value: StatisticsPeriod; label: string }>>(() => [
  { value: '1month', label: t('statistics.periods.oneMonth') },
  { value: '3months', label: t('statistics.periods.threeMonths') },
  { value: '1year', label: t('statistics.periods.oneYear') },
  { value: 'all', label: t('statistics.periods.all') },
]);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-tertiary">
    <!-- Page header with enhanced design -->
    <section class="px-page pt-10 pb-10 mb-8">
      <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
        <div class="flex flex-col gap-6">
          <!-- Title with icon and back button -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex gap-5">
              <div class="p-4 rounded-2xl border border-default">
                <StatisticsFeatureIcon class="icon-static w-12"/>
              </div>
              <div>
                <h1 class="text-3xl font-bold tracking-tight">{{ t('statistics.title') }}</h1>
                <p class="mt-2 text-base text-muted leading-relaxed">
                  {{ t('statistics.description') }}
                </p>
              </div>
            </div>
            
            <Button @click="goBackToDeck"
                    class="w-auto h-auto px-4 py-2 flex items-center gap-2 shrink-0">
              <ArrowIcon class="icon-static w-5 h-5 rotate-180"/>
              <span>{{ t('actions.back') }}</span>
            </Button>
          </div>

          <!-- Period Selector -->
          <div class="flex flex-wrap gap-3">
            <button
              v-for="p in periods"
              :key="p.value"
              type="button"
              @click="period = p.value"
              :class="[
                'px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-105',
                period === p.value
                  ? 'bg-secondary text-inverse border-secondary shadow-lg shadow-secondary/30'
                  : 'border-default bg-primary hover:bg-hover hover:shadow-md'
              ]"
            >
              {{ p.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <div class="px-page pb-page">
      <QueryState :is-loading="isLoading || isFetching" :error="error">
        <template v-if="statistics && statistics.today">
          <div class="flex flex-col gap-8">
            <!-- Today Summary -->
            <TodaySummary :data="statistics.today" />
            
            <!-- Card Counts -->
            <CardCountsPieChart :data="statistics.cardCounts" />
            
            <!-- Calendar Heatmap (full width) -->
            <CalendarHeatmap :data="statistics.calendar" />
            
            <!-- Future Due -->
            <FutureDueChart :data="statistics.futureDue" />
            
            <!-- Retention -->
            <RetentionTable :data="statistics.retention" />
            
            <!-- Answer Buttons -->
            <AnswerButtonsChart :data="statistics.answerButtons" />
          </div>
        </template>
        <template v-else>
          <div class="text-center py-12 text-muted">
            No statistics data available
          </div>
        </template>
      </QueryState>
    </div>
  </div>
</template>

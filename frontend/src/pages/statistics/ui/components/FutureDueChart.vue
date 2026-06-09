<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FutureDue } from '../../model/statistics.types';

const props = defineProps<{
  data: FutureDue;
}>();

const { t } = useI18n();

// Summary stats
const stats = computed(() => [
  { label: t('statistics.futureDue.total'), value: props.data.total },
  { label: t('statistics.futureDue.average'), value: props.data.average.toFixed(1) },
  { label: t('statistics.futureDue.dueTomorrow'), value: props.data.dueTomorrow },
  { label: t('statistics.futureDue.dailyLoad'), value: props.data.dailyLoad },
]);

// Format date for display
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const cardDate = new Date(date);
  cardDate.setHours(0, 0, 0, 0);
  
  // Check if today
  if (cardDate.getTime() === today.getTime()) {
    return 'Сегодня';
  }
  
  // Check if tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (cardDate.getTime() === tomorrow.getTime()) {
    return 'Завтра';
  }
  
  // Format as DD.MM.YYYY
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Get max count for height calculation
const maxCount = computed(() => {
  if (props.data.forecast.length === 0) return 1;
  return Math.max(...props.data.forecast.map(f => f.count));
});

// Calculate bar height in pixels
const getBarHeight = (count: number): number => {
  if (count === 0) return 8;
  const maxHeight = 160;
  return Math.max((count / maxCount.value) * maxHeight, 24);
};

// Get color based on count - using different shades of blue instead of opacity
const getBarColor = (count: number): string => {
  if (count === 0) return '#e0e7ff'; // Very light blue
  const intensity = count / maxCount.value;
  if (intensity < 0.25) return '#bfdbfe'; // Light blue
  if (intensity < 0.5) return '#93c5fd';   // Medium-light blue
  if (intensity < 0.75) return '#60a5fa';  // Medium blue
  return '#3b82f6'; // Full blue
};

// No opacity needed - colors are already at correct saturation
const getBarOpacity = (count: number): number => {
  return 1.0;
};

// Check if date is today
const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime();
};

// Check if date is in the past
const isPast = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return date < today;
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
        <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
        <div class="text-sm text-muted">{{ stat.label }}</div>
      </div>
    </div>
    
    <!-- Backlog Warning -->
    <div
      v-if="data.backlog > 0"
      class="mb-6 p-4 rounded-lg border border-again bg-again bg-opacity-10"
    >
      <div class="font-medium text-again">
        {{ t('statistics.futureDue.backlog') }}: {{ data.backlog }} {{ t('statistics.futureDue.overdueCards') }}
      </div>
    </div>
    
    <!-- Chart -->
    <div v-if="data.forecast.length > 0" class="flex flex-col gap-4">
      <div class="flex items-baseline gap-3">
        <h3 class="text-lg font-bold text-primary">
          {{ t('statistics.futureDue.chartTitle') }}
        </h3>
        <span class="text-sm text-muted">
          {{ data.forecast.length }} {{ data.forecast.length === 1 ? t('statistics.futureDue.datesSingular') : data.forecast.length < 5 ? t('statistics.futureDue.datesPlural2') : t('statistics.futureDue.datesPlural5') }}
        </span>
      </div>
      
      <div class="border border-default rounded-lg overflow-hidden">
        <div class="p-6 bg-tertiary overflow-x-auto">
          <!-- Chart area with axis -->
          <div class="relative">
            <!-- Y-axis label positioned at top -->
            <div class="text-xs text-muted font-medium">
              {{ t('statistics.futureDue.yAxisLabel') }}
            </div>
            
            <!-- Chart container with grid -->
            <div class="ml-5 mt-6 relative">
              <!-- Horizontal grid lines -->
              <div class="absolute top-0 right-0 bottom-0 left-5 flex flex-col justify-between pointer-events-none" style="height: 160px;">
                <div class="w-full border-t border-default/30"></div>
                <div class="w-full border-t border-default/20"></div>
                <div class="w-full border-t border-default/20"></div>
                <div class="w-full border-t border-default/20"></div>
                <div class="w-full border-t border-default/30"></div>
              </div>
              
              <!-- Y-axis labels -->
              <div class="absolute -left-10 top-0 flex flex-col justify-between text-xs text-muted text-right" style="height: 160px; width: 32px;">
                <span>{{ maxCount }}</span>
                <span>{{ Math.round(maxCount * 0.75) }}</span>
                <span>{{ Math.round(maxCount * 0.5) }}</span>
                <span>{{ Math.round(maxCount * 0.25) }}</span>
                <span>0</span>
              </div>
              
              <!-- Bars container -->
              <div class="flex items-end justify-start gap-4 min-h-[200px] pb-14 relative" style="min-height: 160px;">
                <div
                  v-for="(day, i) in data.forecast"
                  :key="i"
                  class="flex flex-col items-center flex-shrink-0"
                >
                  <!-- Bar with count inside -->
                  <div class="relative flex flex-col items-center">
                    <div
                      class="w-10 rounded transition-all duration-200 cursor-pointer border border-default/30 flex items-center justify-center hover:ring-2 hover:ring-accent"
                      :class="[
                        isPast(day.date) ? 'opacity-40' : ''
                      ]"
                      :style="{ 
                        height: getBarHeight(day.count) + 'px',
                        background: getBarColor(day.count),
                        opacity: getBarOpacity(day.count)
                      }"
                      :title="`${formatDate(day.date)}: ${day.count} карточек`"
                    >
                      <!-- Count always inside bar -->
                      <span class="text-xs font-bold text-white drop-shadow-md">
                        {{ day.count }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Date label -->
                  <div class="mt-3 flex flex-col items-center gap-0.5 w-20">
                    <div 
                      class="text-xs font-medium text-center leading-tight"
                      :style="{ 
                        color: isToday(day.date) 
                          ? 'var(--color-secondary)' 
                          : isPast(day.date) 
                            ? 'var(--color-text-muted)' 
                            : 'var(--color-text-primary)'
                      }"
                    >
                      {{ formatDate(day.date) }}
                    </div>
                    <!-- Today badge only if not already showing "Сегодня" as the date -->
                    <div 
                      v-if="isToday(day.date) && formatDate(day.date) !== 'Сегодня'"
                      class="text-[10px] font-bold uppercase tracking-wide"
                      style="color: var(--color-secondary);"
                    >
                      Сегодня
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="px-6 py-4 border-t border-default bg-primary">
          <div class="flex items-center gap-3 text-xs text-muted">
            <span>{{ t('statistics.calendar.less') }}</span>
            <div class="flex items-center gap-[3px]">
              <div class="w-[18px] h-[18px] rounded-[3px] border border-default/30" style="background: #e0e7ff;"></div>
              <div class="w-[18px] h-[18px] rounded-[3px] border border-default/30" style="background: #bfdbfe;"></div>
              <div class="w-[18px] h-[18px] rounded-[3px] border border-default/30" style="background: #93c5fd;"></div>
              <div class="w-[18px] h-[18px] rounded-[3px] border border-default/30" style="background: #60a5fa;"></div>
              <div class="w-[18px] h-[18px] rounded-[3px] border border-default/30" style="background: #3b82f6;"></div>
            </div>
            <span>{{ t('statistics.calendar.more') }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-muted text-center py-12 text-base">
      {{ t('statistics.futureDue.noForecast') }}
    </div>
  </div>
</template>

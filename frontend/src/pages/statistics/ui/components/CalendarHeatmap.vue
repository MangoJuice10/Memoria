<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  data: Array<{ date: string; count: number }>;
}>();

const { t } = useI18n();

const heatmapData = computed(() => {
  const map = new Map(props.data.map(d => [d.date, d.count]));
  const maxCount = Math.max(...props.data.map(d => d.count), 1);
  
  // Get today in local timezone - use separate date components to avoid timezone issues
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();
  
  // Create today's date at midnight
  const today = new Date(todayYear, todayMonth, todayDay);
  
  // Calculate start date: for 365 days INCLUDING today, we go back 364 days
  // But the user wants June 8, 2025 to June 8, 2026 which is 366 days apart
  // So we actually need to subtract 365 days to get the same date last year
  const startDateObj = new Date(todayYear - 1, todayMonth, todayDay);
  
  // Get localized month names from i18n
  const monthNames = [
    t('statistics.calendar.months.jan'),
    t('statistics.calendar.months.feb'),
    t('statistics.calendar.months.mar'),
    t('statistics.calendar.months.apr'),
    t('statistics.calendar.months.may'),
    t('statistics.calendar.months.jun'),
    t('statistics.calendar.months.jul'),
    t('statistics.calendar.months.aug'),
    t('statistics.calendar.months.sep'),
    t('statistics.calendar.months.oct'),
    t('statistics.calendar.months.nov'),
    t('statistics.calendar.months.dec')
  ];
  
  // Build a grid: 7 rows (Sun-Sat) x N columns (weeks)
  // Grid structure: row 1 = month labels, rows 2-8 = Sun-Sat, column 1 = day labels, columns 2+ = weeks
  
  // First, create all date cells with their positions
  const datesByWeekAndDay: Array<Array<{ date: string; count: number; intensity: number } | null>> = [];
  
  let weekIndex = 0;
  
  // Initialize first week
  datesByWeekAndDay[0] = Array(7).fill(null);
  
  // Calculate total days: from startDateObj to today inclusive
  const diffTime = today.getTime() - startDateObj.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include today
  
  for (let i = 0; i < totalDays; i++) {
    // Create a new date for this day using the Date constructor with day offset
    const currentDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate() + i);
    
    const dayOfWeek = currentDate.getDay(); // 0=Sunday, 1=Monday, etc.
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const count = map.get(dateStr) || 0;
    const intensity = count / maxCount;
    
    // Ensure we have this week initialized
    if (!datesByWeekAndDay[weekIndex]) {
      datesByWeekAndDay[weekIndex] = Array(7).fill(null);
    }
    
    datesByWeekAndDay[weekIndex][dayOfWeek] = { date: dateStr, count, intensity };
    
    // If we just filled Saturday (6) and have more days, move to next week
    if (dayOfWeek === 6 && i < totalDays - 1) {
      weekIndex++;
    }
  }
  
  const totalWeeks = datesByWeekAndDay.length;
  
  // Calculate month labels - find the first week where each month appears
  const monthLabels: Array<{ label: string; column: number }> = [];
  let lastMonth = -1;
  
  for (let week = 0; week < totalWeeks; week++) {
    for (let day = 0; day < 7; day++) {
      const cell = datesByWeekAndDay[week][day];
      if (cell) {
        const date = new Date(cell.date);
        const month = date.getMonth();
        
        // If this is a new month and it's early enough in the week to show
        if (month !== lastMonth) {
          // Only add month label if it's at the start of the week (first 3 days)
          // or if it's the very first week
          if (day <= 2 || week === 0) {
            monthLabels.push({ label: monthNames[month], column: week + 2 }); // +2 for day label column
            lastMonth = month;
          }
          break;
        }
      }
    }
  }
  
  // Total contributions
  const totalCount = datesByWeekAndDay
    .flat()
    .filter(cell => cell !== null)
    .reduce((sum, cell) => sum + cell!.count, 0);
  
  return { datesByWeekAndDay, totalWeeks, monthLabels, totalCount };
});

const getIntensityColor = (intensity: number) => {
  if (intensity === 0) return 'var(--color-tertiary)';
  return 'var(--color-good)';
};

const getOpacity = (intensity: number) => {
  if (intensity === 0) return 0.15;
  if (intensity < 0.25) return 0.3;
  if (intensity < 0.5) return 0.5;
  if (intensity < 0.75) return 0.7;
  return 1.0;
};
</script>

<template>
  <div class="bg-primary rounded-lg border border-default p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold">{{ t('statistics.calendar.title') }}</h2>
    </div>
    
    <div class="flex flex-col gap-2">
      <!-- Contribution count -->
      <div class="text-base text-muted mb-3">
        {{ heatmapData.totalCount }} {{ t('statistics.calendar.reviews', heatmapData.totalCount) }} {{ t('statistics.calendar.forLastYear') }}
      </div>
      
      <!-- Heatmap as CSS Grid -->
      <div class="overflow-x-auto">
        <div 
          class="inline-grid gap-[3px] text-sm"
          :style="{
            gridTemplateColumns: `40px repeat(${heatmapData.totalWeeks}, 18px)`,
            gridTemplateRows: '24px repeat(7, 18px)'
          }"
        >
          <!-- Top-left corner (empty) -->
          <div :style="{ gridColumn: 1, gridRow: 1 }"></div>
          
          <!-- Month labels at row 1 -->
          <div
            v-for="month in heatmapData.monthLabels"
            :key="`month-${month.column}`"
            class="text-muted leading-none font-medium"
            :style="{
              gridColumn: month.column,
              gridRow: 1
            }"
          >
            {{ month.label }}
          </div>
          
          <!-- Day labels: Sunday=row 2, Monday=row 3, ..., Saturday=row 8 -->
          <!-- Show only Mon (row 3), Wed (row 5), Fri (row 7) -->
          <div class="text-muted text-right pr-2 leading-none flex items-center justify-end font-medium" 
               :style="{ gridColumn: 1, gridRow: 3 }">
            {{ t('statistics.calendar.days.mon') }}
          </div>
          
          <div class="text-muted text-right pr-2 leading-none flex items-center justify-end font-medium" 
               :style="{ gridColumn: 1, gridRow: 5 }">
            {{ t('statistics.calendar.days.wed') }}
          </div>
          
          <div class="text-muted text-right pr-2 leading-none flex items-center justify-end font-medium" 
               :style="{ gridColumn: 1, gridRow: 7 }">
            {{ t('statistics.calendar.days.fri') }}
          </div>
          
          <!-- Calendar cells: weeks as columns (2+), days as rows (2-8 for Sun-Sat) -->
          <template v-for="(week, weekIndex) in heatmapData.datesByWeekAndDay" :key="`week-${weekIndex}`">
            <div
              v-for="(cell, dayIndex) in week"
              :key="`cell-${weekIndex}-${dayIndex}`"
              class="rounded-[3px] border transition-all tooltip-fast"
              :class="[
                cell
                  ? 'border-default/30 cursor-pointer hover:ring-2 hover:ring-accent'
                  : 'border-transparent'
              ]"
              :title="cell ? `${cell.date}: ${cell.count} ${t('statistics.calendar.reviews', cell.count)}` : ''"
              :style="{
                gridColumn: weekIndex + 2,
                gridRow: dayIndex + 2,
                background: cell ? getIntensityColor(cell.intensity) : 'transparent',
                opacity: cell ? getOpacity(cell.intensity) : 1
              }"
            />
          </template>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="flex items-center gap-3 mt-4 text-sm text-muted">
        <span>{{ t('statistics.calendar.less') }}</span>
        <div class="flex items-center gap-[3px]">
          <div
            v-for="intensity in [0, 0.2, 0.4, 0.6, 0.8, 1]"
            :key="intensity"
            class="w-[18px] h-[18px] rounded-[3px] border border-default/30"
            :style="{
              background: getIntensityColor(intensity),
              opacity: getOpacity(intensity)
            }"
          />
        </div>
        <span>{{ t('statistics.calendar.more') }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.tooltip-fast {
  position: relative;
}

.tooltip-fast:hover::before {
  animation-delay: 0.1s;
}
</style>

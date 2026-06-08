<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { AnswerButtons } from '../../model/statistics.types';

const props = defineProps<{
  data: AnswerButtons;
}>();

const { t } = useI18n();

const phases = computed(() => [
  { key: 'learning', label: t('statistics.phases.learning'), data: props.data.learning },
  { key: 'young', label: t('statistics.phases.young'), data: props.data.young },
  { key: 'mature', label: t('statistics.phases.mature'), data: props.data.mature },
]);

const ratings = ['AGAIN', 'BAD', 'GOOD', 'PERFECT'] as const;

const ratingColors = {
  AGAIN: 'var(--color-again)',
  BAD: 'var(--color-bad)',
  GOOD: 'var(--color-good)',
  PERFECT: 'var(--color-perfect)',
};

const ratingLabels = {
  AGAIN: t('statistics.ratings.again'),
  BAD: t('statistics.ratings.bad'),
  GOOD: t('statistics.ratings.good'),
  PERFECT: t('statistics.ratings.perfect'),
};

const getMaxCount = computed(() => {
  let max = 0;
  phases.value.forEach(phase => {
    ratings.forEach(rating => {
      max = Math.max(max, phase.data[rating]);
    });
  });
  return max || 1;
});

const getBarWidth = (count: number) => {
  return (count / getMaxCount.value) * 100;
};
</script>

<template>
  <div class="bg-primary rounded-lg border border-default p-6">
    <h2 class="text-xl font-bold mb-6">{{ t('statistics.answerButtons.title') }}</h2>
    
    <div class="flex flex-col gap-6">
      <div
        v-for="phase in phases"
        :key="phase.key"
        class="flex flex-col gap-3"
      >
        <h3 class="font-medium">{{ phase.label }}</h3>
        <div class="flex flex-col gap-2">
          <div
            v-for="rating in ratings"
            :key="rating"
            class="flex items-center gap-3"
          >
            <div class="w-20 text-sm">{{ ratingLabels[rating] }}</div>
            <div class="flex-1 h-8 rounded-full bg-tertiary overflow-hidden border border-default relative">
              <div
                class="h-full rounded-full transition-all"
                :style="{
                  width: `${getBarWidth(phase.data[rating])}%`,
                  background: ratingColors[rating]
                }"
              />
              <div class="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {{ phase.data[rating] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

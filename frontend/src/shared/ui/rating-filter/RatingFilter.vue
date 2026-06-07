<!-- ===== AI GENERATED CODE START ===== -->
<script setup lang="ts">
import {IconLabel} from "@/shared/ui";
import {StarIcon} from "../icons";

export interface RatingOption {
  label: string;
  value: number | undefined;
}

const props = defineProps<{
  options: RatingOption[];
  selectedValue: number | undefined;
}>();

const emit = defineEmits<{
  update: [value: number | undefined];
}>();
</script>

<template>
  <div class="flex flex-col items-start gap-5 pl-3">
    <IconLabel class="gap-2.5 pl-1">
      <template #icon>
        <StarIcon class="icon-dynamic-inverse w-5.5 h-5.5"/>
      </template>
      <template #label>
        <span class="text-base font-semibold text-muted mr-2">
          Filter by Rating:
        </span>
      </template>
    </IconLabel>
    <div class="flex gap-3">
      <button
          v-for="opt in options"
          :key="String(opt.value)"
          type="button"
          class="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-105"
          :class="selectedValue === opt.value
            ? 'bg-secondary text-inverse border-secondary shadow-lg shadow-secondary/30'
            : 'border-default bg-primary hover:bg-hover hover:shadow-md'"
          @click="emit('update', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
<!-- ===== AI GENERATED CODE END ===== -->

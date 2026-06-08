<script setup lang="ts">
import {CheckIcon, CloseIcon, IconButton} from "@/shared/ui";
import type {ClassValue} from "vue";
import type {TagResponseDto} from "../model/tag-response.dto";

/* ===== AI GENERATED CODE START ===== */
// REFACTORING
const props = defineProps<{
  tag: TagResponseDto;
  selected?: boolean;
  removable?: boolean;
  disabled?: boolean;
  labelClasses?: ClassValue;
}>();
// REFACTORING

const emit = defineEmits<{
  remove: [tagId: number];
}>();

function handleRemove(event: Event) {
  event.stopPropagation();
  if (!props.disabled) {
    emit("remove", props.tag.id);
  }
}

/* ===== AI GENERATED CODE END ===== */
</script>

<template>
  <!-- REFACTORING -->
  <!-- ===== AI GENERATED CODE START ===== -->
  <span class="group
               flex items-center gap-1.5
               relative
               px-2.5 py-1.25
               rounded-full border border-default
               bg-tertiary
               transition-all duration-200"
        :class="[
          selected && 'ring-2 ring-secondary ring-offset-primary',
          removable && 'hover:shadow-md hover:scale-105 pr-8'
        ]"
        :aria-label="`Tag: ${tag.name}`">
    <span
        class="w-2.5 h-2.5 rounded-full shrink-0"
        :style="{ backgroundColor: tag.color }"
        aria-hidden="true"/>

    <!-- REFACTORING -->
    <span class="flex-1 truncate"
          :class="labelClasses">
      {{ tag.name }}
    </span>
    <!-- REFACTORING -->
    <CheckIcon v-if="selected"
               class="absolute -top-1 -right-2.5
                      w-6 h-6"/>
    <IconButton v-if="removable"
                :size-rem="1"
                has-ring
                :enabled="!disabled"
                :ring-margin-percent="10"
                :aria-label="`Remove ${tag.name}`"
                class="absolute right-1.5"
                @click="handleRemove">
      <CloseIcon/>
    </IconButton>
  </span>
  <!-- ===== AI GENERATED CODE END ===== -->
  <!-- REFACTORING -->
</template>

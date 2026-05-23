<script setup lang="ts">
import {AiChatIcon, ChevronIcon} from "@/shared/ui";

defineProps<{
  isExpanded: boolean;
}>();
</script>

<template>
  <button class="flex gap-2 items-center
                 px-3 py-2
                 bg-primary
                 transition-all duration-300
                 hover:bg-hover"
          :class="!isExpanded && 'fixed top-page translate-y-5 right-0\n' +
                              'w-full max-w-30 hover:max-w-35\n' +
                              'border rounded-l-2xl border-default'">
    <AiChatIcon class="icon-static
                       w-14 h-14"/>
    <ChevronIcon class="w-8 h-8
                        -rotate-90"/>
  </button>
</template>
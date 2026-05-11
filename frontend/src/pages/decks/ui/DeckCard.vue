<script setup lang="ts">
import ClockIcon from "@/shared/ui/icons/ClockIcon.vue";
import {IconLabel, LocalizedLink} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {showOne} from "@/shared/lib";

defineProps<{
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
}>();
</script>

<template>
  <LocalizedLink name="deck" :params="{deckId: String(id)}">
    <div class="flex flex-col divide-y divide-default
            w-flashcard h-flashcard overflow-hidden
            border border-default rounded-2xl
            bg-primary cursor-pointer
            transition duration-200
            hover:scale-105">
      <div class="p-4 text-lg text-center">
        {{ name }}
      </div>
      <div class="grow p-4 text-base text-center">
        {{ description }}
      </div>
      <div class="px-5 py-3
                bg-tertiary">
        <IconLabel class="opacity-70">
          <template #label>
            {{ isPublic }}
          </template>
          <template #icon>
            <ClockIcon class="w-7"/>
          </template>
        </IconLabel>
      </div>
    </div>
  </LocalizedLink>
</template>
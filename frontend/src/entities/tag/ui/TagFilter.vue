<!-- ===== AI GENERATED CODE START ===== -->
<script setup lang="ts">
import {computed} from "vue";
import type {TagResponseDto} from "../model/tag-response.dto";
import {IconLabel, TagIcon} from "@/shared/ui";
import TagContainer from "./TagContainer.vue";
import {useI18n} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();

const props = defineProps<{
  tags: TagResponseDto[];
  selectedTagIds: Set<number>;
  showClearButton?: boolean;
}>();

const emit = defineEmits<{
  toggleTag: [tagId: number];
  clearFilters: [];
}>();

const hasSelection = computed(() => props.selectedTagIds.size > 0);

function isTagSelected(tagId: number): boolean {
  return props.selectedTagIds.has(tagId);
}
</script>

<template>
  <div v-if="tags.length > 0" class="flex flex-col gap-3 pl-3">
    <div class="flex flex-col items-start gap-5">
      <IconLabel class="gap-2.5 pl-1">
        <template #icon>
          <TagIcon class="icon-dynamic w-6 h-6"/>
        </template>
        <template #label>
          <span class="font-semibold text-muted text-base">
            {{ t(codeToKey(codes.SHARED_DECK_FILTER_BY_TAGS)) }}
          </span>
        </template>
      </IconLabel>
      
      <TagContainer
          :tags="tags"
          :selected="isTagSelected"
          :wrap="true"
          :clickable="true"
          @click="emit('toggleTag', $event)"
      />
      
      <button
          v-if="showClearButton && hasSelection"
          type="button"
          class="text-base font-medium font-semibold transition-colors pl-1 hover:underline"
          @click="emit('clearFilters')"
      >
        {{ t(codeToKey(codes.SHARED_DECK_CLEAR_FILTERS)) }}
      </button>
    </div>
  </div>
</template>
<!-- ===== AI GENERATED CODE END ===== -->

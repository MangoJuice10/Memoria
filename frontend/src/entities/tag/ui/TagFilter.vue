<!-- Component for filtering by tags (used in shared decks page) -->
<script setup lang="ts">
import {computed} from "vue";
import type {TagResponseDto} from "../model/tag-response.dto";
import {IconLabel, TagIcon} from "@/shared/ui";
import TagChip from "./TagChip.vue";
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

function handleTagClick(tagId: number) {
  emit('toggleTag', tagId);
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
      
      <!-- Inline tag filter chips -->
      <div class="flex flex-wrap gap-5">
        <button
            v-for="tag in tags"
            :key="tag.id"
            type="button"
            class="transition-all duration-200 hover:scale-105"
            @click="handleTagClick(tag.id)">
          <TagChip
              :tag="tag"
              :selected="isTagSelected(tag.id)"
              :removable="false"
              :disabled="false"/>
        </button>
      </div>
      
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

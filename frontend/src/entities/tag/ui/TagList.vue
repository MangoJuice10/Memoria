<!-- Component for displaying a collapsed list of tags (used in deck cards) -->
<script setup lang="ts">
import {IconLabel, TagIcon} from "@/shared/ui";
import {computed} from "vue";
import type {TagResponseDto} from "../model/tag-response.dto";
import TagChip from "./TagChip.vue";

const props = withDefaults(defineProps<{
  tags: TagResponseDto[];
  maxVisible?: number;
}>(), {
  maxVisible: 3,
});

const displayedTags = computed(() => props.tags.slice(0, props.maxVisible));
const hasMoreTags = computed(() => props.tags.length > props.maxVisible);
const extraTagsCount = computed(() => props.tags.length - props.maxVisible);
</script>

<template>
  <div v-if="tags.length > 0"
       class="flex items-center gap-3">
    <TagChip
        v-for="(tag, idx) in displayedTags"
        :key="tag.id"
        :tag="tag"
        :selected="false"
        :removable="false"
        :disabled="false"
        :label-classes="idx === displayedTags.length - 1 && 'truncate'"
        :class="idx === displayedTags.length - 1 && 'overflow-hidden'"/>
    <span v-if="hasMoreTags" class="text-muted font-semibold whitespace-nowrap shrink-0">
      +{{ extraTagsCount }}
    </span>
  </div>
  <IconLabel v-else
             class="gap-3">
    <template #icon>
      <TagIcon class="w-6 h-6 opacity-80"/>
    </template>
    <template #label>
        <span class="text-lg font-semibold text-muted">
          No tags yet
        </span>
    </template>
  </IconLabel>
</template>

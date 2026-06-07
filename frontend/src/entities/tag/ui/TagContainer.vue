<!-- ===== AI GENERATED CODE START ===== -->
<script setup lang="ts">
import {IconLabel, TagIcon} from "@/shared/ui";
import {computed} from "vue";
import type {TagResponseDto} from "../model/tag-response.dto";
import TagChip from "./TagChip.vue";

const props = withDefaults(defineProps<{
  tags: TagResponseDto[];
  maxVisible?: number;
  removable?: boolean;
  selected?: (tagId: number) => boolean;
  disabled?: boolean;
  clickable?: boolean;
  wrap?: boolean;
}>(), {
  maxVisible: 3,
  removable: false,
  disabled: false,
  clickable: false,
  wrap: false,
});

const emit = defineEmits<{
  remove: [tagId: number];
  click: [tagId: number];
}>();

const displayedTags = computed(() => 
  props.wrap ? props.tags : props.tags.slice(0, props.maxVisible)
);
const hasMoreTags = computed(() => !props.wrap && props.tags.length > props.maxVisible);
const extraTagsCount = computed(() => props.tags.length - props.maxVisible);

function handleRemove(tagId: number) {
  emit('remove', tagId);
}

function handleClick(tagId: number) {
  if (props.clickable) {
    emit('click', tagId);
  }
}
</script>

<template>
  <div :class="wrap ? 'flex flex-wrap gap-4' : 'flex items-center gap-3'">
    <template v-if="tags.length > 0">
      <component
          :is="clickable ? 'button' : 'div'"
          v-for="tag in displayedTags"
          :key="tag.id"
          :type="clickable ? 'button' : undefined"
          :class="[
            clickable ? 'transition-all duration-200 hover:scale-105' : '',
            wrap ? '' : 'shrink-0'
          ]"
          @click="handleClick(tag.id)"
      >
        <TagChip
            :tag="tag"
            :selected="selected ? selected(tag.id) : false"
            :removable="removable"
            :disabled="disabled"
            @remove="handleRemove"
        />
      </component>
      <span v-if="hasMoreTags" class="text-muted font-semibold whitespace-nowrap shrink-0">
        +{{ extraTagsCount }}
      </span>
    </template>
    <IconLabel v-else
               class="gap-3">
      <template #icon>
        <TagIcon class="w-6 h-6
                        opacity-80"/>
      </template>
      <template #label>
        <span class="text-lg font-semibold text-muted">
          No tags yet
        </span>
      </template>
    </IconLabel>
  </div>
</template>
<!-- ===== AI GENERATED CODE END ===== -->

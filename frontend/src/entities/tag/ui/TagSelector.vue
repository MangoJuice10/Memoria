<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import {tagsApi, tagsQueryKeys} from "../api";
import type {TagResponseDto} from "../model/tag-response.dto";

const emit = defineEmits<{
  select: [tag: TagResponseDto];
}>();

const {data: tags, isLoading} = useQuery({
  queryKey: tagsQueryKeys.my(),
  queryFn: () => tagsApi.getMyTags(),
});

function onSelect(event: Event) {
  const select = event.target as HTMLSelectElement;
  const selectedId = Number(select.value);
  const tag = tags.value?.find((t) => t.id === selectedId);
  if (tag) {
    emit("select", tag);
    select.value = "";
  }
}
</script>

<template>
  <div class="relative inline-flex items-center">
    <span v-if="isLoading"
          class="text-sm text-secondary px-2 py-1">
      Loading…
    </span>
    <select
      v-else
      class="appearance-none pl-3 pr-8 py-1.5
             text-sm rounded-lg border border-default
             bg-primary cursor-pointer
             focus:outline-none focus:ring-2 focus:ring-offset-1"
      aria-label="Select a tag"
      @change="onSelect"
    >
      <option value="" disabled selected>Select tag…</option>
      <option
        v-for="tag in tags"
        :key="tag.id"
        :value="tag.id"
      >
        {{ tag.name }}
      </option>
    </select>
  </div>
</template>

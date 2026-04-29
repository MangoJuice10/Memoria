<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {IconLabel} from "@/shared/ui";

defineProps<{
  menuItemView: MenuItemView<string | number>
}>();
</script>

<template>
  <IconLabel class="justify-start w-full px-7 py-3 cursor-pointer
                    hover:bg-hover">
    <template #icon>
      <component :is="menuItemView.icon"
                 class="w-10"/>
    </template>
    <template #label>
      <span class="font-semibold">
        {{ menuItemView.label }}
      </span>
    </template>
  </IconLabel>
</template>
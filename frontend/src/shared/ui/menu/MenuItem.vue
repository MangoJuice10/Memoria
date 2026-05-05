<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {IconLabel} from "@/shared/ui";

defineProps<{
  menuItemView: MenuItemView<string | number>
}>();
</script>

<template>
  <div class="w-full px-7 py-3 cursor-pointer
              hover:bg-hover">
    <IconLabel>
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
  </div>
</template>
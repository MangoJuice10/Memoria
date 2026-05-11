<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {IconLabel} from "@/shared/ui";

defineProps<{
  menuItemView: MenuItemView<string | number>,
  iconClasses?: string;
  labelClasses?: string;
}>();
</script>

<template>
  <div class="w-full cursor-pointer
              hover:bg-hover">
    <IconLabel>
      <template #icon>
        <component :is="menuItemView.icon"
                   :class="iconClasses"/>
      </template>
      <template #label>
      <span class="font-semibold"
            :class="labelClasses">
        {{ menuItemView.label }}
      </span>
      </template>
    </IconLabel>
  </div>
</template>
<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {MenuContainer, MenuItem} from "@/shared/ui";
import type {ClassValue} from "vue";

export type MenuDisplay = "vertical" | "horizontal" | "custom";

withDefaults(defineProps<{
  display?: MenuDisplay;
  menuItemViews: MenuItemView<string | number>[];
  menuContainerClasses?: ClassValue;
  menuItemClasses?: ClassValue;
  menuItemIconClasses?: ClassValue;
  menuItemLabelClasses?: ClassValue;
  menuItemInactiveClasses?: ClassValue;
  menuItemActiveClasses?: ClassValue;
  menuItemActiveIconClasses?: ClassValue;
  menuItemActiveLabelClasses?: ClassValue;
}>(), {
  display: "custom"
});
</script>

<template>
  <MenuContainer :display
                 :class="menuContainerClasses">
    <MenuItem v-for="menuItemView in menuItemViews"
              :key="menuItemView.id"
              :menu-item-view
              :icon-classes="menuItemIconClasses"
              :label-classes="menuItemLabelClasses"
              :inactive-classes="menuItemInactiveClasses"
              :active-classes="menuItemActiveClasses"
              :active-icon-classes="menuItemActiveIconClasses"
              :active-label-classes="menuItemActiveLabelClasses"
              :class="menuItemClasses"/>
  </MenuContainer>
</template>
<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {Dropdown} from "@/shared/ui";
import Menu from "@/shared/ui/menu/Menu.vue";
import type {ClassValue} from "vue";

defineProps<{
  menuItemViews: MenuItemView<string | number>[];
  dropdownTriggerClasses?: ClassValue;
  dropdownMenuClasses?: ClassValue;
  menuContainerClasses?: ClassValue;
  menuItemClasses?: ClassValue;
  menuItemIconClasses?: ClassValue;
  menuItemLabelClasses?: ClassValue;
  menuItemActiveClasses?: ClassValue;
}>();
</script>

<template>
  <Dropdown :trigger-classes="dropdownTriggerClasses"
            :menu-classes="dropdownMenuClasses">
    <template #trigger>
      <slot/>
    </template>
    <template #menu>
      <Menu :menu-item-views
            :menu-container-classes
            :menu-item-classes
            :menu-item-icon-classes
            :menu-item-label-classes
            :menu-item-active-classes/>
    </template>
  </Dropdown>
</template>
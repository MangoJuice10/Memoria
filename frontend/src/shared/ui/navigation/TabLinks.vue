<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import Menu from "@/shared/ui/menu/Menu.vue";
import type {ClassValue} from "vue";

defineProps<{
  menuItemViews: MenuItemView<string | number>[];
  menuItemActiveClasses?: ClassValue;
}>();
</script>

<template>
  <Menu display="horizontal"
        :menu-item-views
        menu-container-classes="group/tab-links gap-10"
        menu-item-label-classes="transition-transform duration-300
                                 hover:text-shadow-[0_0_1px] hover:underline active:scale-105"
        menu-item-icon-classes="w-6.5 h-6.5"
        :menu-item-active-classes
        menu-item-active-label-classes="text-shadow-[0_0_1px] underline
                                        group-hover/tab-links:text-shadow-none group-hover/tab-links:no-underline"/>
</template>
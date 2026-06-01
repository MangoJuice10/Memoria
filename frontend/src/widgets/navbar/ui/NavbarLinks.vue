<script setup lang="ts">
import type {MenuItemView, NavbarItemId} from "@/shared/config";
import {Menu} from "@/shared/ui";

defineProps<{
  menuItemViews: MenuItemView<NavbarItemId>[]
}>();
</script>

<template>
  <Menu :menu-item-views
        menu-container-classes="inline-grid grid-flow-col auto-cols-fr justify-center items-center gap-5 w-fit"
        menu-item-classes="w-full px-3 py-1.5 border rounded-xl
                           font-semibold"
        menu-item-label-classes="inline-block h-[2lh] content-center truncate text-wrap"
        menu-item-icon-classes="icon-static
                                w-7.5"
        menu-item-inactive-classes="border-transparent
                                    hover:bg-hover"
        menu-item-active-classes="border-default
                                  text-inverse
                                  bg-secondary"/>
</template>
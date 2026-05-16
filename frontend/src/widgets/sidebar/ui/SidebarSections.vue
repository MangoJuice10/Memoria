<script setup lang="ts">
import type {MenuSectionView, SidebarSectionId, SidebarItemId} from "@/shared/config";
import SidebarLinks from "./SidebarLinks.vue";

defineProps<{
  menuSectionViews: MenuSectionView<SidebarSectionId, SidebarItemId>[]
}>();
</script>

<template>
  <section v-for="menuSectionView in menuSectionViews"
           :key="menuSectionView.id">
    <h3 v-text="menuSectionView.label" class="max-w-full my-heading truncate text-muted"/>
    <SidebarLinks :menu-item-views="menuSectionView.menuItemViews"/>
  </section>
</template>
<script setup lang="ts">
import type {MenuSectionView, NavigationItemId, NavigationSectionId} from "@/shared/config";
import SidebarLinks from "./SidebarLinks.vue";

defineProps<{
  menuSectionViews: MenuSectionView<NavigationSectionId, NavigationItemId>[]
}>();
</script>

<template>
  <section v-for="menuSectionView in menuSectionViews"
           :key="menuSectionView.id">
    <h3 v-text="menuSectionView.label" class="max-w-full my-heading truncate text-muted"/>
    <SidebarLinks :menu-item-views="menuSectionView.menuItemViews"/>
  </section>
</template>
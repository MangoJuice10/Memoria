<script setup lang="ts">
import type {MenuSectionView, NavigationItemId, NavigationSectionId} from "@/shared/config";
import SidebarLinks from "./SidebarLinks.vue";

defineProps<{
  navigationSectionViews: MenuSectionView<NavigationSectionId, NavigationItemId>[]
}>();
</script>

<template>
  <section v-for="navigationSectionView in navigationSectionViews"
           :key="navigationSectionView.id">
    <h3 v-text="navigationSectionView.label" class="max-w-full my-heading truncate text-muted"/>
    <SidebarLinks :menu-item-views="navigationSectionView.menuItemViews"/>
  </section>
</template>
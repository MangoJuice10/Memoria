<script setup lang="ts">
import type {NavigationSectionView} from "@/shared/config";
import SidebarLinks from "./SidebarLinks.vue";

defineProps<{
  navigationSectionViews: NavigationSectionView[]
}>();
</script>

<template>
  <section v-for="navigationSectionView in navigationSectionViews"
           :key="navigationSectionView.id">
    <h3 v-text="navigationSectionView.label" class="max-w-full my-heading truncate text-muted"/>
    <SidebarLinks :navigation-item-views="navigationSectionView.navigationItemViews"/>
  </section>
</template>
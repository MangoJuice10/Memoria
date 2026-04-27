<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {NavigationSectionView} from "@/shared/config";

defineProps<{
  navigationSectionView: NavigationSectionView
}>();
</script>

<template>
  <nav class="flex flex-col items-start gap-3 w-fit">
    <NavigationLink v-for="navigationItemView in navigationSectionView.navigationItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    class="grow-0 shrink-0 text-sm"/>
  </nav>
</template>
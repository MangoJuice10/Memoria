<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {NavigationSectionView} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  navigationSectionView: NavigationSectionView
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav class="flex flex-col items-start gap-3 w-fit">
    <NavigationLink v-for="navigationItemView in navigationSectionView.navigationItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    :is-active="isNavigationLinkActive(navigationItemView)"
                    class="grow-0 shrink-0 text-sm"/>
  </nav>
</template>
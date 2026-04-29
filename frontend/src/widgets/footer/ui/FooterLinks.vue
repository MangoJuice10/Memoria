<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {MenuSectionView, NavigationItemId, NavigationSectionId} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  navigationSectionView: MenuSectionView<NavigationSectionId, NavigationItemId>
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav class="flex flex-col items-start gap-3 w-fit">
    <NavigationLink v-for="navigationItemView in navigationSectionView.menuItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    :is-active="isNavigationLinkActive(navigationItemView)"
                    class="grow-0 shrink-0 rounded-2xl text-sm"/>
  </nav>
</template>
<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {MenuSectionView, NavigationItemId, NavigationSectionId} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  menuSectionView: MenuSectionView<NavigationSectionId, NavigationItemId>
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav class="flex flex-col items-start gap-3 w-fit">
    <NavigationLink v-for="menuItemView in menuSectionView.menuItemViews"
                    :key="menuItemView.id"
                    :menu-item-view
                    :is-active="isNavigationLinkActive(menuItemView)"
                    class="grow-0 shrink-0 rounded-2xl text-sm"/>
  </nav>
</template>
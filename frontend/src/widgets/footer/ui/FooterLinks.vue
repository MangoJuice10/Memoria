<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {
  FooterItemId,
  FooterSectionId,
  MenuSectionView,
} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  menuSectionView: MenuSectionView<FooterSectionId, FooterItemId>
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav class="flex flex-col items-start gap-3 w-fit">
    <NavigationLink v-for="menuItemView in menuSectionView.menuItemViews"
                    :key="menuItemView.id"
                    :menu-item-view
                    class="grow-0 shrink-0 rounded-2xl text-sm"
                    :class="isNavigationLinkActive(menuItemView)
                              ? 'border-default text-inverse bg-secondary'
                              : 'border-transparent text-landing hover:border-landing hover:bg-hover'"
    />
  </nav>
</template>
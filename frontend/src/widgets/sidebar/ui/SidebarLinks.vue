<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {MenuItemView} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  menuItemViews: MenuItemView<string | number>[]
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav class="flex flex-col items-start gap-5 h-full mb-section">
    <NavigationLink v-for="menuItemView in menuItemViews"
                    :key="menuItemView.id"
                    :menu-item-view
                    icon-label-classes="justify-start"
                    iconClasses="icon-static
                                 w-7.5"
                    label-classes="truncate"
                    class="grow-0 w-full font-semibold px-5 py-2
                           border rounded-xl border-transparent"
                    :class="isNavigationLinkActive(menuItemView)
                              ? 'border-default text-inverse bg-secondary'
                              : 'border-transparent text-landing hover:border-landing hover:bg-hover'"/>
  </nav>
</template>
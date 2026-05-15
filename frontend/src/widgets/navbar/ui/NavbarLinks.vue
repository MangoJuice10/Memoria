<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {MenuItemView, NavigationItemId} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  menuItemViews: MenuItemView<NavigationItemId>[]
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav
      class="inline-grid grid-flow-col auto-cols-fr justify-center items-center gap-5 w-fit">
    <NavigationLink v-for="menuItemView in menuItemViews"
                    :key="menuItemView.id"
                    :menu-item-view
                    label-classes="inline-block h-[2lh] content-center truncate text-wrap"
                    icon-classes="icon-static
                                  w-7.5"
                    class="inline-flex justify-center items-center w-full px-2 py-1.5 font-semibold border rounded-xl"
                    :class="isNavigationLinkActive(menuItemView)
                              ? 'border-default text-inverse bg-secondary'
                              : 'border-transparent text-landing hover:border-landing hover:bg-hover'">
    </NavigationLink>
  </nav>
</template>
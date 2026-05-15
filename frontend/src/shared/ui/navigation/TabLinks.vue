<script setup lang="ts">
import type {MenuItemView, NavigationItemId} from "@/shared/config";
import NavigationLink from "./NavigationLink.vue";
import {useNavigation} from "@/shared/lib";

defineProps<{
  menuItemViews: MenuItemView<NavigationItemId>[]
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <div class="group/tab-links
              flex justify-center items-center gap-5">
    <NavigationLink v-for="menuItemView in menuItemViews"
                    :key="menuItemView.id"
                    :menu-item-view
                    class="transition-transform duration-300
                           hover:text-shadow-[0_0_1px] hover:underline active:scale-105"
                    :class="{['text-shadow-[0_0_1px] underline\n' +
                             'group-hover/tab-links:text-shadow-none group-hover/tab-links:no-underline']: isNavigationLinkActive(menuItemView)}">
      {{ menuItemView.label }}
    </NavigationLink>
  </div>
</template>
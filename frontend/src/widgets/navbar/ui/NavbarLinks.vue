<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {NavigationItemView} from "@/shared/config";
import {useNavigation} from "@/shared/lib";

defineProps<{
  navigationItemViews: NavigationItemView[]
}>();

const {isNavigationLinkActive} = useNavigation();
</script>

<template>
  <nav
      class="inline-grid grid-flow-col auto-cols-fr justify-center items-center gap-5 w-fit">
    <NavigationLink v-for="navigationItemView in navigationItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    :is-active="isNavigationLinkActive(navigationItemView)"
                    label-classes="inline-block h-[2lh] content-center truncate text-wrap"
                    class="inline-flex justify-center items-center w-full px-2 py-1.5 font-semibold border rounded-xl">
    </NavigationLink>
  </nav>
</template>
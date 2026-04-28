<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {NavigationItemView} from "@/shared/config";
import {useRoute} from "vue-router";

defineProps<{
  navigationItemViews: NavigationItemView[]
}>();

const route = useRoute();

const isNavlinkActive = (navLink: NavigationItemView) => {
  return navLink.routeName === route.name;
};
</script>

<template>
  <nav
      class="hidden md:inline-grid md:grid-flow-col md:auto-cols-fr md:justify-center md:items-center md:gap-5 md:w-fit">
    <NavigationLink v-for="navigationItemView in navigationItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    label-classes="inline-block h-[2lh] content-center truncate text-wrap"
                    class="inline-flex justify-center items-center w-full px-2 py-1.5 font-semibold border rounded-xl"
                    :class="isNavlinkActive(navigationItemView) ?
                    'border-landing text-inverse bg-secondary' :
                    'border-transparent text-landing hover:border-landing hover:bg-hover'">
    </NavigationLink>
  </nav>
</template>
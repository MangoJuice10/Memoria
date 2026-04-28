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
  <nav class="flex flex-col items-start gap-5 h-full mb-section">
    <NavigationLink v-for="navigationItemView in navigationItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    :is-active="isNavigationLinkActive(navigationItemView)"
                    class="grow-0 w-full font-semibold px-5 py-2
                           border rounded-xl border-transparent"/>
  </nav>
</template>
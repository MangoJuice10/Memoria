<script setup lang="ts">
import {NavigationLink} from "@/shared/ui";
import type {NavigationItemView} from "@/shared/config";

defineProps<{
  navigationItemViews: NavigationItemView[]
}>();
</script>

<template>
  <nav class="flex flex-col items-start gap-5 h-full mb-section">
    <NavigationLink v-for="navigationItemView in navigationItemViews"
                    :key="navigationItemView.id"
                    :navigation-item-view
                    class="grow-0 w-full font-semibold px-2 py-1.5
                           border rounded-xl border-transparent hover:border-default hover:bg-hover"/>
  </nav>
</template>
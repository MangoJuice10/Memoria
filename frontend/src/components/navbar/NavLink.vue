<script setup lang="ts">
defineProps<{ path: string }>();
</script>

<template>
  <!--
  Setting the text color here prevents it from being inherited through RouterLink's slot.
  RouterLink applies reactive updates to its rendered <a> element, which causes inherited color on
  slotted content to be resolved more than once during a theme switch. Since color transitions are
  globally enabled, this results in the text color animating twice ("flickering").
  By setting the color explicitly, inheritance is broken and only a single transition occurs.
  -->
  <RouterLink :to="path"
              class="flex justify-center items-center px-2.5 py-1.25 border border-transparent rounded-xl text-(--color-text) hover:border-border hover:bg-hover cursor-pointer">
    <slot/>
  </RouterLink>
</template>


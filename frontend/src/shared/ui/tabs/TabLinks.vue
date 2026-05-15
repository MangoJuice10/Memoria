<script setup lang="ts">
defineProps<{
  menuItems;
}>();
</script>

<template>
  <div class="group/tab-links">
    <TabLink v-for="tabLink in tabLinks"
             :key="tabLink.id"
             class="hover:font-semibold hover:underline">
      {{ tabLink.name }}
    </TabLink>
  </div>
</template>
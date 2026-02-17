<script setup lang="ts">
import {inject} from "vue";
import IconButton from "@/components/utils/IconButton.vue";
import BurgerMenuIcon from "@/components/icons/utils/BurgerMenuIcon.vue";

const sidebar = inject<{
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
}>("sidebar");

if (!sidebar) throw new Error("Sidebar's state and methods weren't provided");
</script>

<template>
  <IconButton @click="sidebar.toggleSidebar">
    <BurgerMenuIcon class="w-12 icon-dynamic"/>
  </IconButton>
</template>
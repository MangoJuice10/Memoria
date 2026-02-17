<script setup lang="ts">
import {ref} from "vue";
import CancelIcon from "@/components/icons/utils/CancelIcon.vue";

const isHovered = ref(false);
</script>

<template>
  <div class="group aspect-square border border-transparent rounded-full hover:border hover:border-default hover:bg-hover"
       @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <CancelIcon :class="[!isHovered ? 'icon-static' : 'icon-static-inverse', 'scale-60']"/>
  </div>
</template>

<style>

</style>
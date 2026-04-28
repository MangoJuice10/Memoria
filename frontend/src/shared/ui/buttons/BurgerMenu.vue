<script setup lang="ts">
import {IconButton} from "@/shared/ui";
import {BurgerMenuIcon} from "@/shared/ui/icons";

defineEmits<{
  toggle: []
}>();
</script>

<template>
  <IconButton @click="$emit('toggle')">
    <BurgerMenuIcon class="w-12 icon-dynamic"/>
  </IconButton>
</template>
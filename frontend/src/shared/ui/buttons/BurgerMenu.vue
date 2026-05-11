<script setup lang="ts">
import {IconButton} from "@/shared/ui";
import {BurgerMenuIcon} from "@/shared/ui/icons";

defineEmits<{
  toggle: []
}>();
</script>

<template>
  <IconButton :size-rem="3"
      @click="$emit('toggle')">
    <BurgerMenuIcon class="icon-dynamic"/>
  </IconButton>
</template>
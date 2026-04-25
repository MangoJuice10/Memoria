<script setup lang="ts">
import IconButton from "@/shared/ui/IconButton.vue";
import {VisibleIcon, HiddenIcon} from "@/shared/ui/icons";

defineProps<{
  isHidden: boolean,
}>();

defineEmits<{
  (e: "update:isHidden", value: boolean): void
}>();

</script>

<template>
    <IconButton @click="$emit('update:isHidden', !isHidden)" class="absolute top-1/2 right-2 -translate-y-1/2">
        <VisibleIcon v-if="isHidden" class="w-10 icon-dynamic"/>
        <HiddenIcon v-else class="w-10 icon-dynamic"/>
    </IconButton>
</template>
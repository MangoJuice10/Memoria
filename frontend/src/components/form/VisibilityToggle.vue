<script setup lang="ts">
import IconButton from "@/components/utils/IconButton.vue";
import Visible from "@/components/icons/utils/Visible.vue";
import Hidden from "@/components/icons/utils/Hidden.vue";

defineProps<{
  isVisible: boolean,
}>();

defineEmits<{
  (e: "update:isVisible", value: boolean): void
}>();

</script>

<template>
    <IconButton @click="$emit('update:isVisible', !isVisible)" class="absolute top-1/2 right-2 -translate-y-1/2">
        <Visible v-if="!isVisible" class="w-10 icon-dynamic"/>
        <Hidden v-else class="w-10 icon-dynamic"/>
    </IconButton>
</template>
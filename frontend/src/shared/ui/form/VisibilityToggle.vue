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
    <IconButton :size-rem="2.5"
        class="absolute top-1/2 right-2 -translate-y-1/2"
                @click="$emit('update:isHidden', !isHidden)">
        <VisibleIcon v-if="isHidden" class="icon-dynamic"/>
        <HiddenIcon v-else class="icon-dynamic"/>
    </IconButton>
</template>
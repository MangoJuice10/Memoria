<script setup lang="ts">
import {Button} from "@/shared/ui";

defineEmits<{
  "confirm": [],
  "cancel": []
}>();
</script>

<template>
  <div class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-100
              border border-default rounded-2xl text-lg
              bg-tertiary">
    <h2 class="text-center mb-5">
      <slot name="heading"/>
    </h2>
    <p class="mb-10">
      <slot name="content"/>
    </p>
    <div class="flex justify-center gap-10">
      <Button @click="$emit('cancel')">
        <slot name="cancel"/>
      </Button>
      <Button @click="$emit('confirm')"
              class="bg-danger! hover:text-inverse! hover:bg-danger!">
        <slot name="confirm"/>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Modal from "./Modal.vue";
import {Button} from "@/shared/ui";

defineEmits<{
  "confirm": [],
  "cancel": []
}>();
</script>

<template>
  <Modal>
    <div class="p-10">
      <h2 class="mb-5 text-center">
        <slot name="heading"/>
      </h2>
      <p class="mb-10 text-center">
        <slot name="content"/>
      </p>
      <div class="flex justify-center gap-10">
        <Button @click="$emit('cancel')">
          <slot name="cancel"/>
        </Button>
        <Button color="var(--color-surface-danger)"
                color-hover="var(--color-surface-danger"
                color-active="var(--color-surface-danger"
                color-text-hover="var(--color-text-inverse"
                color-text-active="var(--color-text-inverse)"
            @click="$emit('confirm')">
          <slot name="confirm"/>
        </Button>
      </div>
    </div>
  </Modal>
</template>
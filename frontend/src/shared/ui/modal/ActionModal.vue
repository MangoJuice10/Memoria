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
        <Button @click="$emit('confirm')"
                class="bg-danger! hover:text-inverse! hover:bg-danger!">
          <slot name="confirm"/>
        </Button>
      </div>
    </div>
  </Modal>
</template>
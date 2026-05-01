<script setup lang="ts">
import {useRouter} from "vue-router";
import {useViewerStore} from "@/entities/viewer";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {Modal} from "@/shared/ui";
import {onMounted} from "vue";

const router = useRouter();
const {logout} = useViewerStore();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

async function handleConfirm() {
  await logout();
  await router.push({
    name: "home"
  });
  backdropStore.hide();
  modalStore.hide();
}

async function handleCancel() {
  backdropStore.hide();
  modalStore.hide();
}

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});
</script>

<template>
  <Modal class="p-10"
         @confirm="handleConfirm"
         @cancel="handleCancel">
    <template #heading>
      {{ $t("modals.logout.heading") }}
    </template>

    <template #content>
      {{ $t("modals.logout.content") }}
    </template>

    <template #cancel>
      {{ $t("modals.logout.buttons.cancel") }}
    </template>

    <template #confirm>
      {{ $t("modals.logout.buttons.confirm") }}
    </template>
  </Modal>
</template>
<script setup lang="ts">
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {showOne} from "@/shared/lib";
import {CreateCard} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {resourceNameActionPropertyCodes} from "@/shared/config";

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const openModal = () => {
  const createDeckModal = defineAsyncComponent(() => import("./modals/CreateDeckModal.vue"));
  showOne(backdropStore);
  modalStore.show(createDeckModal);
};

</script>

<template>
  <CreateCard class="w-deck h-deck
                     shadow-lg
                     hover:shadow-2xl"
              @click="openModal">
    {{ $t(codeToKey(resourceNameActionPropertyCodes.DECK_CREATE_NAME)) }}
  </CreateCard>
</template>
<script setup lang="ts">
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {showOne} from "@/shared/lib";
import {CreateCard} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const openModal = () => {
  const createEducationalResourceModal = defineAsyncComponent(() => import("./modals/CreateEducationalResourceModal.vue"));
  showOne(backdropStore);
  modalStore.show(createEducationalResourceModal);
};

</script>

<template>
  <CreateCard class="w-educational-resource h-educational-resource
                     shadow-lg
                     hover:shadow-2xl"
              @click="openModal">
    {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_CREATE_NAME)) }}
  </CreateCard>
</template>
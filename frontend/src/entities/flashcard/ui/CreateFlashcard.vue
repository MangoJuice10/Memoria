<script setup lang="ts">
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {showOne} from "@/shared/lib";
import {CreateCard} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {resourceCodes} from "@/shared/config";

const props = defineProps<{
  deckId: number;
}>();


const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const openModal = () => {
  const createFlashcardModal = defineAsyncComponent(() => import("./modals/CreateFlashcardModal.vue"));
  showOne(backdropStore);
  modalStore.show(createFlashcardModal, {deckId: props.deckId});
};

</script>

<template>
  <CreateCard class="w-flashcard h-flashcard
                     shadow-xl
                     hover:shadow-2xl"
              @click="openModal">
    {{ $t(codeToKey(resourceCodes.FLASHCARD_CREATE_NAME)) }}
  </CreateCard>
</template>
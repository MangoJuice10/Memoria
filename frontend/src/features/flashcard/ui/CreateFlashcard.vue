<script setup lang="ts">
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {showOne} from "@/shared/lib";
import {AddIcon} from "@/shared/ui/icons";
import {IconLabel} from "@/shared/ui";

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
  <div class="flex justify-center items-center
            w-flashcard h-flashcard
            border border-dashed border-default rounded-2xl
            bg-primary cursor-pointer
            transition duration-200
            hover:scale-105"
       @click="openModal">
    <IconLabel>
      <template #label>
        <!--TODO-->
        <span class="text-base">
          Add flashcards
        </span>
      </template>
      <template #icon>
        <AddIcon class="w-7"/>
      </template>
    </IconLabel>
  </div>
</template>

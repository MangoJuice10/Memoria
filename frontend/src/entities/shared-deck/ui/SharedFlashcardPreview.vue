<!-- ===== AI GENERATED CODE START ===== -->
<script setup lang="ts">
import type {SharedFlashcardResponseDto} from "../model/shared-flashcard-response.dto";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {showOne} from "@/shared/lib";
import {defineAsyncComponent, onMounted} from "vue";

const props = defineProps<{
  flashcard: SharedFlashcardResponseDto;
}>();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

function openFullViewModal() {
  const viewFullFlashcardModal = defineAsyncComponent(() => import("./modals/ViewFullFlashcardModal.vue"));
  showOne(backdropStore);
  modalStore.show(viewFullFlashcardModal, {
    flashcard: props.flashcard
  });
}

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});
</script>

<template>
  <div class="grid grid-rows-20 grid-cols-1 divide-y divide-default
              rounded-2xl
              cursor-pointer
              bg-primary shadow-lg
              border border-default
              transition duration-200
              hover:scale-105 hover:shadow-2xl"
       style="width: 17rem; height: 25rem;"
       @click="openFullViewModal">
    <!-- Front side -->
    <div class="row-span-9 p-5 relative">
      <div class="flex items-center gap-2 mb-3 absolute top-5 left-5">
        <div class="w-3 h-3 rounded-full bg-blue-500 shrink-0"></div>
        <p class="text-xs font-semibold uppercase tracking-wider text-muted">Front</p>
      </div>
      <div class="flex items-center justify-center h-full pt-8">
        <div class="text-lg text-center line-clamp-6">
          {{ flashcard.front }}
        </div>
      </div>
    </div>

    <!-- Back side -->
    <div class="row-span-11 p-5 relative rounded-b-2xl bg-tertiary">
      <div class="flex items-center gap-2 mb-3 absolute top-5 left-5">
        <div class="w-3 h-3 rounded-full bg-green-500 shrink-0"></div>
        <p class="text-xs font-semibold uppercase tracking-wider text-muted">Back</p>
      </div>
      <div class="flex items-center justify-center h-full pt-8">
        <div class="text-base text-center line-clamp-8">
          {{ flashcard.back }}
        </div>
      </div>
    </div>
  </div>
</template>
<!-- ===== AI GENERATED CODE END ===== -->

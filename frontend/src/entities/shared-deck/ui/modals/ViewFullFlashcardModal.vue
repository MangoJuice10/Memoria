<!-- ===== AI GENERATED CODE START ===== -->
<script setup lang="ts">
import {Button, CloseIcon, Modal} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import type {SharedFlashcardResponseDto} from "../../model/shared-flashcard-response.dto";

const props = defineProps<{
  flashcard: SharedFlashcardResponseDto;
}>();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

function closeModal() {
  backdropStore.hide();
  modalStore.hide();
}
</script>

<template>
  <Modal>
    <div class="flex flex-col gap-6 w-[50rem] max-w-[90vw] max-h-[90vh] overflow-hidden p-10">
      <!-- Header -->
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-2xl font-bold">Flashcard Details</h2>
        <button
            type="button"
            class="p-2 rounded-full hover:bg-hover transition-colors"
            @click="closeModal"
        >
          <CloseIcon class="w-6 h-6"/>
        </button>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-6 overflow-y-auto pr-2">
        <!-- Front side -->
        <div class="rounded-2xl border-2 border-default bg-primary p-8">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-3 h-3 rounded-full bg-blue-500 shrink-0"></div>
            <p class="text-sm font-semibold uppercase tracking-wider text-muted">Front</p>
          </div>
          <div class="text-lg leading-relaxed whitespace-pre-wrap">
            {{ flashcard.front }}
          </div>
        </div>

        <!-- Back side -->
        <div class="rounded-2xl border-2 border-default bg-tertiary p-8">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-3 h-3 rounded-full bg-green-500 shrink-0"></div>
            <p class="text-sm font-semibold uppercase tracking-wider text-muted">Back</p>
          </div>
          <div class="text-base leading-relaxed whitespace-pre-wrap">
            {{ flashcard.back }}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end pt-4 border-t border-default">
        <Button @click="closeModal">
          Close
        </Button>
      </div>
    </div>
  </Modal>
</template>
<!-- ===== AI GENERATED CODE END ===== -->

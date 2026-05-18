<script setup lang="ts">
import {Button, FormError, IconLabel, TabLinks, Toggle} from "@/shared/ui";
import {DeckIcon} from "@/shared/ui/icons";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {showOne, useMenu, useValidation} from "@/shared/lib";
import {DECK_TABS_LAYOUT} from "../config/deck-tabs-layout.ts";
import {useI18n} from "vue-i18n";
import {type DeckResponseDto, decksApi, decksQueryKeys} from "@/entities/deck";
import {createUpdateDeckSchema, type UpdateDeckDto} from "@/entities/deck";
import {defineAsyncComponent, ref} from "vue";
import axios from "axios";
import {type ErrorResponse, queryClient} from "@/shared/api";
import {useMutation} from "@tanstack/vue-query";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";

const props = defineProps<{
  id: number;
  name: string;
  isPublic: boolean;
}>();

const data = ref<UpdateDeckDto>({
  isPublic: props.isPublic,
});

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const {menuItemViews} = useMenu(DECK_TABS_LAYOUT, t);

const {
  getFormError,
  clientValidate,
  serverValidate
} = useValidation(data, createUpdateDeckSchema(t), {
  mode: "lazy",
  t
});

const updateDeckMutation = useMutation({
  mutationFn: ({deckId, updateDeckDto}: {
    deckId: number;
    updateDeckDto: UpdateDeckDto;
  }) => decksApi.update(deckId, updateDeckDto),
  onSuccess: async (updatedDeck, variables) => {
    await queryClient.setQueryData(
        decksQueryKeys.byId(variables.deckId),
        (old: DeckResponseDto | undefined) => {
          if (!old) return old;
          return updatedDeck;
        }
    );
  }
});

const openDeleteDeckModal = () => {
  const deleteDeckModal = defineAsyncComponent(() => import("@/entities/deck/ui/modals/DeleteDeckModal.vue"));
  showOne(backdropStore);
  modalStore.show(deleteDeckModal, {
    id: props.id
  });
};

async function submit() {
  const validatedData = await clientValidate();
  if (!validatedData) return;

  try {
    await updateDeckMutation.mutateAsync({
      deckId: props.id,
      updateDeckDto: validatedData
    });
    push(t(codeToKey(codes.DECK_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.DECK_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
}
</script>

<template>
  <div class="flex justify-between py-4 border-b border-default">
    <div class="flex items-center gap-6">
      <IconLabel>
        <template #label>
          <span class="text-xl font-semibold">
            {{ name }}
          </span>
        </template>
        <template #icon>
          <DeckIcon class="w-8"/>
        </template>
      </IconLabel>
      <Toggle v-model:is-on="data.isPublic"
              class="grow
                     h-10"
              @click="submit">
        <template #on>
          <span class="text-lg font-semibold">
            {{ $t(codeToKey(codes.DECK_PRIVATE)) }}
          </span>
        </template>
        <template #off>
          <span class="text-lg font-semibold">
            {{ $t(codeToKey(codes.DECK_PUBLIC)) }}
          </span>
        </template>
      </Toggle>
      <Button v-if="$route.name === 'deck-info'" color="var(--color-surface-danger)"
              color-hover="var(--color-surface-danger)"
              color-active="var(--color-surface-danger)"
              color-text="var(--color-text-inverse)"
              color-text-hover="var(--color-text-inverse)"
              color-text-active="var(--color-text-inverse)"
              class="text-base
                     h-10"
              @click="openDeleteDeckModal">
        {{ $t(codeToKey(codes.DECK_DELETE_NAME)) }}
      </Button>
      <FormError :error="getFormError()"
                 class="text-base"/>
    </div>
    <TabLinks :menu-item-views
              class="text-lg"/>
  </div>
</template>
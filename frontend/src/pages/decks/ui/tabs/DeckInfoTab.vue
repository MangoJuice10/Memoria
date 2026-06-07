<script setup lang="ts">
import {computed, ref} from "vue";
import {asset, useValidation} from "@/shared/lib";
import {Button, DropdownMenu, Form, FormError, FormField, IconLabel, PlusIcon, TagIcon, UploadImage} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {codeToKey} from "@/shared/i18n";
import {allowedImageTypes, codes, MAX_DECK_COVER_SIZE} from "@/shared/config";
import {
  createUpdateDeckSchema,
  createDeleteDeckCoverMutation,
  createUpdateDeckMutation,
  createUploadDeckCoverMutation,
  type UpdateDeckDto,
} from "@/entities/deck";
import {useI18n} from "vue-i18n";
import {
  createUploadImageOptionalSchema,
  type UploadImageOptionalInput,
  useToastStore
} from "@/shared/model";
import {useQuery} from "@tanstack/vue-query";
import {
  tagsApi,
  tagsQueryKeys,
  createDetachTagMutation,
  createAttachExistingTagMutation,
  createCreateAndAttachTagMutation,
  createTagSchema,
  type CreateTagDto,
  TagChip,
} from "@/entities/tag";
import type {MenuItemView} from "@/shared/config";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  coverUrl: string | null;
}>();

const {t} = useI18n();
const {push} = useToastStore();

// ── Deck info form ────────────────────────────────────────────────────────────
const data = ref<UpdateDeckDto>({
  name: props.name,
  description: props.description,
});

const {
  isValid,
  getError,
  getFormError,
  isFieldTouched,
  isFormTouched,
  touch,
  touchAll,
  clientValidate,
  serverValidate,
  reset,
} = useValidation(data, createUpdateDeckSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const updateDeckMutation = createUpdateDeckMutation();
const deleteDeckCoverMutation = createDeleteDeckCoverMutation();

const cover = ref<UploadImageOptionalInput>({image: undefined});
const coverValidation = useValidation(cover, createUploadImageOptionalSchema(t, allowedImageTypes, MAX_DECK_COVER_SIZE));
const updateDeckCoverMutation = createUploadDeckCoverMutation();

const isSubmitEnabled = computed(() =>
    isFormTouched() && isValid.value
    || coverValidation.isFormTouched() && coverValidation.isValid.value
);

const submit = async () => {
  touchAll();
  const result = await clientValidate();
  if (!result.success) return;
  const coverResult = await coverValidation.clientValidate();
  if (!coverResult.success) return;

  try {
    await updateDeckMutation.mutateAsync({deckId: props.id, updateDeckDto: result.data});
    push(t(codeToKey(codes.DECK_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.DECK_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }

  if (coverResult.data.image) {
    try {
      await updateDeckCoverMutation.mutateAsync({deckId: props.id, file: coverResult.data.image});
      push(t(codeToKey(codes.DECK_COVER_UPDATE_SUCCESS)), "success", "update");
    } catch (error) {
      push(t(codeToKey(codes.DECK_COVER_UPDATE_ERROR)), "error");
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as ErrorResponse;
        await coverValidation.serverValidate(body);
      }
    }
  } else if (coverResult.data.image === null) {
    try {
      await deleteDeckCoverMutation.mutateAsync(props.id);
      push(t(codeToKey(codes.DECK_COVER_DELETE_SUCCESS)), "success", "update");
    } catch (error) {
      push(t(codeToKey(codes.DECK_COVER_DELETE_ERROR)), "error");
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as ErrorResponse;
        await coverValidation.serverValidate(body);
      }
    }
  }
};

// ── Tag management ────────────────────────────────────────────────────────────
const {data: tags} = useQuery({
  queryKey: computed(() => tagsQueryKeys.byDeck(props.id)),
  queryFn: () => tagsApi.getTagsByDeck(props.id),
});

const {data: myTags} = useQuery({
  queryKey: tagsQueryKeys.my(),
  queryFn: () => tagsApi.getMyTags(),
});

const detachMutation = createDetachTagMutation(props.id);
const attachExistingMutation = createAttachExistingTagMutation(props.id);
const createAndAttachMutation = createCreateAndAttachTagMutation(props.id);

// Build MenuItemView list for the DropdownMenu from user's existing tags
const existingTagMenuItems = computed<MenuItemView<number>[]>(() => {
  const attached = new Set((tags.value ?? []).map(t => t.id));
  return (myTags.value ?? [])
      .filter(t => !attached.has(t.id))
      .map(t => ({
        id: t.id,
        label: t.name,
        callback: () => attachExistingMutation.mutate(t.id),
        icon: TagIcon
      }));
});

const newTagName = ref("");
const newTagColor = ref("#4f7cff");
const tagFormErrors = ref<{ name?: string; color?: string }>({});

function validateNewTag(): CreateTagDto | null {
  const result = createTagSchema.safeParse({name: newTagName.value, color: newTagColor.value});
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    tagFormErrors.value = {name: fieldErrors.name?.[0], color: fieldErrors.color?.[0]};
    return null;
  }
  tagFormErrors.value = {};
  return result.data;
}

async function submitNewTag() {
  const dto = validateNewTag();
  if (!dto) return;
  await createAndAttachMutation.mutateAsync(dto);
  newTagName.value = "";
  newTagColor.value = "#4f7cff";
}
</script>

<template>
  <div class="mt-5">
    <Form :form-error="getFormError()"
          :is-submit-enabled="isSubmitEnabled"
          :is-reset-enabled="true"
          @submit="submit"
          @reset="reset"
          class="col-span-3 text-lg">
      <template #fields>

        <!-- Cover + Tags side by side -->
        <div class="flex gap-10 items-start">

          <!-- Cover upload -->
          <div class="w-fit shrink-0">
            <h3 class="font-semibold mb-5">{{ $t(codeToKey(codes.DECK_COVER)) }}</h3>
            <div class="flex flex-col items-center gap-3">
              <UploadImage :old-image-url="coverUrl"
                           :default-img-url="asset('filler/noDeckCover.png')"
                           @img-change="(file) => { coverValidation.touch('image'); cover.image = file; coverValidation.clientValidate(); }"
                           img-classes="p-10 border border-dashed border-default"
                           class="grow"/>
              <FormError :error="coverValidation.getError('image')"/>
            </div>
          </div>

          <!-- Tags panel - Completely redesigned -->
          <div class="flex flex-col gap-5
                      w-full">
            <h3 class="font-semibold">Tags</h3>

            <!-- Current tags display -->
            <div class="rounded-2xl border-2 border-default p-5
                        bg-primary">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-bold uppercase tracking-wider ">Current Tags</h4>
                <span v-if="tags && tags.length > 0"
                      class="px-2.5 py-1 text-xs font-bold bg-secondary text-inverse rounded-full">
                  {{ tags.length }}
                </span>
              </div>

              <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-3">
                <TagChip
                    v-for="tag in tags"
                    :key="tag.id"
                    :tag="tag"
                    :removable="true"
                    :disabled="detachMutation.isPending.value"
                    class="text-sm"
                    @remove="detachMutation.mutate"
                />
              </div>
              <div v-else class="flex flex-col items-center gap-3 py-8 text-center">
                <div
                    class="w-12 h-12 rounded-full bg-tertiary border-2 border-dashed border-default flex items-center justify-center">
                  <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                <p class="font-medium ">No tags attached yet</p>
                <p class="text-xs ">Add tags to organize your deck</p>
              </div>
            </div>

            <!-- Add tags section -->
            <div class="rounded-2xl border-2 border-dashed border-default bg-primary p-5">
              <h4 class="font-bold uppercase tracking-wider mb-4">Add Tags</h4>

              <!-- Attach existing tag -->
              <div v-if="existingTagMenuItems.length > 0" class="mb-5">
                <!-- REFACTORING -->
                <DropdownMenu
                    :menu-item-views="existingTagMenuItems"
                    align="right"
                    :gap-rem="1.5"
                    dropdown-trigger-classes="flex items-center gap-2
                                              px-4 py-2 border-2 rounded-full border-default
                                              font-semibold
                                              bg-primary
                                              cursor-pointer
                                              transition-all
                                              hover:bg-hover"
                    menu-container-classes="flex flex-col items-start divide-y divide-default
                                            min-w-56 max-h-64
                                            border-2 border-default rounded-2xl overflow-y-auto
                                            bg-primary"
                    menu-item-classes="flex justify-start
                                       w-full px-5 py-2.5
                                       cursor-pointer
                                       transition-colors
                                       hover:bg-hover"
                    menu-item-icon-classes="w-5 h-5"
                    class="w-fit">
                  <IconLabel class="gap-2.5">
                    <template #icon>
                      <PlusIcon class="icon-static
                             w-4 h-4"/>
                    </template>
                    <template #label>
                      <span class="text-base font-semibold">
                        Select tag
                      </span>
                    </template>
                  </IconLabel>
                </DropdownMenu>
                <!-- REFACTORING -->
              </div>

              <!-- Create new tag -->
              <div>
                <p class="font-medium mb-2.5">Create new tag</p>
                <form class="flex flex-col gap-3" @submit.prevent="submitNewTag">
                  <div class="flex items-start gap-3">
                    <!-- Tag name input -->
                    <div class="flex-1 min-w-0">
                      <input
                          v-model="newTagName"
                          type="text"
                          placeholder="Enter tag name..."
                          class="w-full px-4 py-2.5 rounded-xl border-2 border-default bg-primary font-medium
                                 placeholder:
                                 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20
                                 transition-all"
                          :class="{'border-error focus:border-error focus:ring-error/20': tagFormErrors.name}"
                      />
                      <p v-if="tagFormErrors.name" class="mt-1.5 text-xs font-medium text-error">{{
                          tagFormErrors.name
                        }}</p>
                    </div>

                    <!-- Color picker -->
                    <div class="flex items-center gap-2">
                      <div class="relative">
                        <input
                            v-model="newTagColor"
                            type="color"
                            class="w-12 h-12 rounded-xl border-2 border-default cursor-pointer p-1 bg-primary"
                            :class="{'border-error': tagFormErrors.color}"
                        />
                      </div>
                      <input
                          v-model="newTagColor"
                          type="text"
                          placeholder="#4f7cff"
                          maxlength="7"
                          class="w-28 px-3 py-2.5 rounded-xl border-2 border-default bg-primary font-mono font-medium
                                 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20
                                 transition-all"
                          :class="{'border-error focus:border-error focus:ring-error/20': tagFormErrors.color}"
                      />
                    </div>

                    <!-- Submit button -->
                    <Button
                        type="submit"
                        :enabled="!createAndAttachMutation.isPending.value"
                        class="shrink-0"
                    >
                      <span class="flex items-center gap-2 font-semibold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Create
                      </span>
                    </Button>
                  </div>
                  <p v-if="tagFormErrors.color" class="text-xs font-medium text-error">{{ tagFormErrors.color }}</p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Name field -->
        <FormField v-model="data.name"
                   id="front"
                   :label="$t(codeToKey(codes.NAME_NAME))"
                   :placeholder="$t(codeToKey(codes.NAME_PLACEHOLDER))"
                   :touched="isFieldTouched('front')"
                   :error="getError('front')"
                   @blur="() => { touch('front'); clientValidate(); }"/>

        <!-- Description field -->
        <FormField v-model="data.description"
                   variant="textarea"
                   id="back"
                   :label="$t(codeToKey(codes.DESCRIPTION_NAME))"
                   :placeholder="$t(codeToKey(codes.DESCRIPTION_PLACEHOLDER))"
                   :touched="isFieldTouched('back')"
                   :error="getError('back')"
                   @blur="() => { touch('back'); clientValidate(); }"
                   inputClasses="h-110"/>
      </template>
      <template #submit>{{ $t(codeToKey(codes.DECK_UPDATE_CONFIRM)) }}</template>
    </Form>
  </div>
</template>

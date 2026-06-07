<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {useQuery} from "@tanstack/vue-query";
import {getIdRouteParam} from "@/app/router";
import {
  tagsApi,
  tagsQueryKeys,
  createDetachTagMutation,
  createAttachExistingTagMutation,
  createCreateAndAttachTagMutation,
  createTagSchema,
  TagChip,
  TagSelector,
  type CreateTagDto,
} from "@/entities/tag";
import {Button, QueryState} from "@/shared/ui";

const route = useRoute();
const deckId = computed(() => getIdRouteParam(route.params.deckId));

// ── Query ────────────────────────────────────────────────────────────────────
const {data: tags, isLoading, error} = useQuery({
  queryKey: computed(() => tagsQueryKeys.byDeck(deckId.value)),
  queryFn: () => tagsApi.getTagsByDeck(deckId.value),
});

// ── Mutations ────────────────────────────────────────────────────────────────
const detachMutation = computed(() => createDetachTagMutation(deckId.value));
const attachExistingMutation = computed(() => createAttachExistingTagMutation(deckId.value));
const createAndAttachMutation = computed(() => createCreateAndAttachTagMutation(deckId.value));

// ── New-tag form ─────────────────────────────────────────────────────────────
const newTagName = ref("");
const newTagColor = ref("#4f7cff");
const formErrors = ref<{name?: string; color?: string}>({});

function validateNewTag(): CreateTagDto | null {
  const result = createTagSchema.safeParse({
    name: newTagName.value,
    color: newTagColor.value,
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    formErrors.value = {
      name: fieldErrors.name?.[0],
      color: fieldErrors.color?.[0],
    };
    return null;
  }

  formErrors.value = {};
  return result.data;
}

async function submitNewTag() {
  const dto = validateNewTag();
  if (!dto) return;

  await createAndAttachMutation.value.mutateAsync(dto);
  newTagName.value = "";
  newTagColor.value = "#4f7cff";
}
</script>

<template>
  <QueryState :is-loading :error class="grow">
    <div class="flex flex-col gap-8 py-6">

      <!-- Attached tags -->
      <section class="flex flex-col gap-4">
        <h3 class="font-semibold">Attached tags</h3>

        <div v-if="tags && tags.length > 0"
             class="flex flex-wrap gap-2">
          <div v-for="tag in tags"
               :key="tag.id"
               class="flex items-center gap-1.5">
            <TagChip :tag="tag"/>
            <button
              type="button"
              class="flex items-center justify-center w-5 h-5 rounded-full
                     text-xs font-bold leading-none
                     border border-default bg-primary
                     hover:border-error hover:text-error
                     transition-colors"
              :aria-label="`Detach tag ${tag.name}`"
              :disabled="detachMutation.isPending.value"
              @click="detachMutation.mutate(tag.id)"
            >
              ×
            </button>
          </div>
        </div>

        <p v-else class="text-sm text-muted">
          No tags attached yet.
        </p>
      </section>

      <!-- Attach existing tag -->
      <section class="flex flex-col gap-2">
        <h3 class="font-semibold">Attach existing tag</h3>
        <TagSelector @select="(tag) => attachExistingMutation.mutate(tag.id)"/>
      </section>

      <!-- Create & attach new tag -->
      <section class="flex flex-col gap-4">
        <h3 class="font-semibold">New tag</h3>

        <form class="flex flex-col gap-3 max-w-xs"
              @submit.prevent="submitNewTag">

          <div class="flex flex-col gap-1">
            <label for="tag-name" class="text-sm font-medium">Name</label>
            <input
              id="tag-name"
              v-model="newTagName"
              type="text"
              placeholder="Tag name"
              class="px-3 py-2 rounded-lg border border-default bg-primary text-sm
                     focus:outline-none focus:ring-2 focus:ring-offset-1"
              :class="{'border-error': formErrors.name}"
            />
            <p v-if="formErrors.name" class="text-xs text-error font-semibold">
              {{ formErrors.name }}
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <label for="tag-color" class="text-sm font-medium">Color</label>
            <div class="flex items-center gap-2">
              <input
                id="tag-color"
                v-model="newTagColor"
                type="color"
                class="w-10 h-10 rounded-lg border border-default bg-primary cursor-pointer p-0.5"
              />
              <input
                v-model="newTagColor"
                type="text"
                placeholder="#4f7cff"
                maxlength="7"
                class="flex-1 px-3 py-2 rounded-lg border border-default bg-primary text-sm
                       focus:outline-none focus:ring-2 focus:ring-offset-1 font-mono"
                :class="{'border-error': formErrors.color}"
              />
            </div>
            <p v-if="formErrors.color" class="text-xs text-error font-semibold">
              Color must be a valid hex (e.g. #A3B4C5)
            </p>
          </div>

          <Button
            type="submit"
            :enabled="!createAndAttachMutation.isPending.value"
            class="self-start"
          >
            Add tag
          </Button>
        </form>
      </section>

    </div>
  </QueryState>
</template>

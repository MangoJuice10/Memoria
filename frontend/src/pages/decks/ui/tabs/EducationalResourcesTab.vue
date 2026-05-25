<script setup lang="ts">
import {computed, ref} from "vue";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {
  CreateEducationalResource,
  educationalResourcesApi,
  educationalResourcesQueryKeys
} from "@/entities/educational-resource";
import type {
  EducationalResourceResponseDto
} from "@/entities/educational-resource/model/educational-resource-response.dto.ts";
import {
  Button,
  CloseIcon,
  EducationalResourceFillerIcon,
  EducationalResourcesIntroductionIcon,
  FileIcon,
  PinIcon,
  QueryState,
  RefreshIcon,
  SearchIcon
} from "@/shared/ui";
import {useToastStore} from "@/shared/model";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  id: number;
  name: string;
}>();

const {t, locale} = useI18n();
const {push} = useToastStore();
const queryClient = useQueryClient();

const search = ref("");
const pendingResourceId = ref<number | null>(null);

const deckResourcesQueryKey = computed(() => educationalResourcesQueryKeys.byDeck(props.id));

const {
  data: allResourcesData,
  isLoading: isAllResourcesLoading,
  error: allResourcesError,
} = useQuery({
  queryKey: educationalResourcesQueryKeys.all,
  queryFn: () => educationalResourcesApi.findAll()
});

const {
  data: attachedResourcesData,
  isLoading: isAttachedResourcesLoading,
  error: attachedResourcesError,
} = useQuery({
  queryKey: deckResourcesQueryKey,
  queryFn: () => educationalResourcesApi.findAllByDeck(props.id)
});

const attachEducationalResourceMutation = useMutation({
  mutationFn: ({deckId, educationalResourceId}: {
    deckId: number;
    educationalResourceId: number;
  }) => educationalResourcesApi.attachToDeck(deckId, educationalResourceId),
  onSuccess: async (_, variables) => {
    const educationalResource = allResources.value.find(({id}) => id === variables.educationalResourceId);

    await queryClient.setQueryData(
        educationalResourcesQueryKeys.byDeck(variables.deckId),
        (old: EducationalResourceResponseDto[] | undefined) => {
          if (!educationalResource) return old;
          if (!old) return [educationalResource];
          if (old.some(({id}) => id === educationalResource.id)) return old;
          return [educationalResource, ...old];
        }
    );
  }
});

const detachEducationalResourceMutation = useMutation({
  mutationFn: ({deckId, educationalResourceId}: {
    deckId: number;
    educationalResourceId: number;
  }) => educationalResourcesApi.detachFromDeck(deckId, educationalResourceId),
  onSuccess: async (_, variables) => {
    await queryClient.setQueryData(
        educationalResourcesQueryKeys.byDeck(variables.deckId),
        (old: EducationalResourceResponseDto[] | undefined) => {
          if (!old) return old;
          return old.filter(({id}) => id !== variables.educationalResourceId);
        }
    );
  }
});

const isLoading = computed(() =>
    isAllResourcesLoading.value || isAttachedResourcesLoading.value
);

const error = computed(() =>
    (allResourcesError.value ?? attachedResourcesError.value ?? null) as Error | null
);

const allResources = computed(() => sortResources(allResourcesData.value ?? []));
const attachedResources = computed(() => sortResources(attachedResourcesData.value ?? []));
const attachedResourceIds = computed(() =>
    new Set(attachedResources.value.map(({id}) => id))
);
const availableResources = computed(() =>
    allResources.value.filter(({id}) => !attachedResourceIds.value.has(id))
);

const normalizedSearch = computed(() => search.value.trim().toLowerCase());
const hasSearch = computed(() => normalizedSearch.value.length > 0);
const visibleAttachedResources = computed(() =>
    filterResources(attachedResources.value, normalizedSearch.value)
);
const visibleAvailableResources = computed(() =>
    filterResources(availableResources.value, normalizedSearch.value)
);

const dateFormatter = computed(() =>
    new Intl.DateTimeFormat(locale.value, {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
);

function sortResources(resources: EducationalResourceResponseDto[]) {
  return [...resources].sort((first, second) =>
      second.updatedAt.localeCompare(first.updatedAt)
  );
}

function filterResources(
    resources: EducationalResourceResponseDto[],
    query: string
) {
  if (!query) return resources;

  return resources.filter(({name, description}) =>
      name.toLowerCase().includes(query)
      || description.toLowerCase().includes(query)
  );
}

function formatDate(value: string) {
  return dateFormatter.value.format(new Date(value));
}

function clearSearch() {
  search.value = "";
}

function isPendingResource(resourceId: number) {
  return pendingResourceId.value === resourceId;
}

async function attachEducationalResource(resource: EducationalResourceResponseDto) {
  pendingResourceId.value = resource.id;

  try {
    await attachEducationalResourceMutation.mutateAsync({
      deckId: props.id,
      educationalResourceId: resource.id
    });
    push(t("deckEducationalResources.feedback.attachSuccess"), "success", "create");
  } catch {
    push(t("deckEducationalResources.feedback.attachError"), "error");
  } finally {
    pendingResourceId.value = null;
  }
}

async function detachEducationalResource(resource: EducationalResourceResponseDto) {
  pendingResourceId.value = resource.id;

  try {
    await detachEducationalResourceMutation.mutateAsync({
      deckId: props.id,
      educationalResourceId: resource.id
    });
    push(t("deckEducationalResources.feedback.detachSuccess"), "success", "delete");
  } catch {
    push(t("deckEducationalResources.feedback.detachError"), "error");
  } finally {
    pendingResourceId.value = null;
  }
}
</script>

<template>
  <QueryState :is-loading
              :error
              class="grow">
    <div class="flex flex-col gap-6 py-8">
      <section class="rounded-4xl border border-default bg-primary p-6 shadow-lg">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div class="flex items-start gap-4">
              <EducationalResourcesIntroductionIcon class="icon-dynamic w-16 shrink-0"/>
              <div class="space-y-2">
                <h2 class="text-2xl font-semibold">
                  {{ t("deckEducationalResources.heading", {deckName: name}) }}
                </h2>
                <p class="max-w-3xl text-base text-muted">
                  {{ t("deckEducationalResources.subheading") }}
                </p>
              </div>
            </div>
            <div class="summary-grid">
              <div class="rounded-3xl border border-default bg-tertiary p-4 shadow-sm">
                <span class="text-3xl font-semibold">
                  {{ attachedResources.length }}
                </span>
                <p class="mt-1 text-sm text-muted">
                  {{ t("deckEducationalResources.summary.attached") }}
                </p>
              </div>
              <div class="rounded-3xl border border-default bg-tertiary p-4 shadow-sm">
                <span class="text-3xl font-semibold">
                  {{ availableResources.length }}
                </span>
                <p class="mt-1 text-sm text-muted">
                  {{ t("deckEducationalResources.summary.available") }}
                </p>
              </div>
              <div class="rounded-3xl border border-default bg-tertiary p-4 shadow-sm">
                <span class="text-3xl font-semibold">
                  {{ allResources.length }}
                </span>
                <p class="mt-1 text-sm text-muted">
                  {{ t("deckEducationalResources.summary.total") }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <label class="flex items-center gap-3 rounded-3xl border border-default bg-tertiary px-4 py-3 shadow-sm">
              <SearchIcon class="w-6 shrink-0 opacity-70"/>
              <input v-model="search"
                     type="text"
                     :placeholder="t('deckEducationalResources.searchPlaceholder')"
                     class="w-full bg-transparent outline-none">
              <button v-if="hasSearch"
                      type="button"
                      class="rounded-full p-1 transition-colors hover:bg-hover"
                      @click="clearSearch">
                <CloseIcon class="w-4"/>
              </button>
            </label>
            <p class="text-sm text-muted">
              {{
                t("deckEducationalResources.results", {
                  attached: visibleAttachedResources.length,
                  available: visibleAvailableResources.length
                })
              }}
            </p>
          </div>
        </div>
      </section>

      <div class="sections">
        <section class="rounded-4xl border border-default bg-primary p-10 shadow-lg">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <PinIcon class="w-6"/>
                <h3 class="font-semibold">
                  {{ t("deckEducationalResources.sections.attached.title") }}
                </h3>
              </div>
              <p class="text-sm text-muted">
                {{ t("deckEducationalResources.sections.attached.description") }}
              </p>
            </div>
            <span class="rounded-full border border-default bg-tertiary px-3 py-1 text-sm font-semibold">
              {{ attachedResources.length }}
            </span>
          </div>

          <div v-if="visibleAttachedResources.length"
               class="resource-grid mt-6">
            <article v-for="resource in visibleAttachedResources"
                     :key="resource.id"
                     class="resource-card border border-default bg-tertiary shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <div class="resource-card__cover border-b border-default">
                <img v-if="resource.coverUrl"
                     :src="resource.coverUrl" alt=""
                     class="w-full h-full object-cover">
                <div v-else
                     class="relative flex items-center justify-center w-full h-full overflow-hidden">
                  <EducationalResourceFillerIcon class="icon-dynamic-inverse h-full w-full"/>
                  <span class="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-lg line-clamp-4">
                    {{ resource.name }}
                  </span>
                </div>
                <span class="resource-card__badge">
                  {{ t("deckEducationalResources.actions.attached") }}
                </span>
              </div>

              <div class="flex flex-col gap-3 px-5 py-4">
                <div class="space-y-1">
                  <div class="flex items-start justify-between gap-4">
                    <h4 class="text-lg font-semibold line-clamp-2">
                      {{ resource.name }}
                    </h4>
                    <PinIcon class="w-5 shrink-0"/>
                  </div>
                  <p class="text-sm text-muted">
                    {{ formatDate(resource.createdAt) }}
                  </p>
                </div>
                <p class="text-sm text-muted line-clamp-4">
                  {{ resource.description || t("deckEducationalResources.noDescription") }}
                </p>
              </div>

              <div class="flex items-center justify-between gap-4 border-t border-default px-5 py-4">
                <a :href="resource.fileUrl"
                   target="_blank"
                   rel="noreferrer"
                   class="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
                  <FileIcon class="w-5"/>
                  {{ t("deckEducationalResources.actions.open") }}
                </a>
                <Button :enabled="!isPendingResource(resource.id)"
                        color="var(--color-surface-danger)"
                        color-hover="var(--color-surface-danger)"
                        color-active="var(--color-surface-danger)"
                        color-text="var(--color-text-inverse)"
                        color-text-hover="var(--color-text-inverse)"
                        color-text-active="var(--color-text-inverse)"
                        class="min-w-32 h-11"
                        @click="detachEducationalResource(resource)">
                  <span class="inline-flex items-center gap-2">
                    <RefreshIcon v-if="isPendingResource(resource.id)"
                                 class="w-4 animate-spin"/>
                    <span>{{ t("deckEducationalResources.actions.detach") }}</span>
                  </span>
                </Button>
              </div>
            </article>
          </div>

          <div v-else
               class="empty-state mt-6">
            <EducationalResourcesIntroductionIcon class="icon-dynamic w-24"/>
            <h4 class="text-xl font-semibold text-center">
              {{ t("deckEducationalResources.sections.attached.emptyTitle") }}
            </h4>
            <p class="max-w-md text-center text-sm text-muted">
              {{
                hasSearch
                    ? t("deckEducationalResources.sections.shared.emptySearch")
                    : t("deckEducationalResources.sections.attached.emptyDescription")
              }}
            </p>
          </div>
        </section>

        <section class="rounded-4xl border border-default bg-primary p-10 shadow-lg">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-2">
              <h3 class="font-semibold">
                {{ t("deckEducationalResources.sections.library.title") }}
              </h3>
              <p class="text-sm text-muted">
                {{ t("deckEducationalResources.sections.library.description") }}
              </p>
            </div>
            <span class="rounded-full border border-default bg-tertiary px-3 py-1 text-sm font-semibold">
              {{ availableResources.length }}
            </span>
          </div>

          <div class="resource-grid mt-6">
            <CreateEducationalResource class="h-full w-full"/>

            <article v-for="resource in visibleAvailableResources"
                     :key="resource.id"
                     class="resource-card border border-default bg-tertiary shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <div class="resource-card__cover border-b border-default">
                <img v-if="resource.coverUrl"
                     :src="resource.coverUrl" alt=""
                     class="w-full h-full object-cover">
                <div v-else
                     class="relative flex items-center justify-center w-full h-full overflow-hidden">
                  <EducationalResourceFillerIcon class="icon-dynamic-inverse h-full w-full"/>
                  <span class="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-lg line-clamp-4">
                    {{ resource.name }}
                  </span>
                </div>
                <span class="resource-card__badge">
                  {{ t("deckEducationalResources.actions.available") }}
                </span>
              </div>

              <div class="flex flex-col gap-3 px-5 py-4">
                <div class="space-y-1">
                  <h4 class="text-lg font-semibold line-clamp-2">
                    {{ resource.name }}
                  </h4>
                  <p class="text-sm text-muted">
                    {{ formatDate(resource.createdAt) }}
                  </p>
                </div>
                <p class="text-sm text-muted line-clamp-4">
                  {{ resource.description || t("deckEducationalResources.noDescription") }}
                </p>
              </div>

              <div class="flex items-center justify-between gap-4 border-t border-default px-5 py-4">
                <a :href="resource.fileUrl"
                   target="_blank"
                   rel="noreferrer"
                   class="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
                  <FileIcon class="w-5"/>
                  {{ t("deckEducationalResources.actions.open") }}
                </a>
                <Button :enabled="!isPendingResource(resource.id)"
                        class="min-w-32 h-11"
                        @click="attachEducationalResource(resource)">
                  <span class="inline-flex items-center gap-2">
                    <RefreshIcon v-if="isPendingResource(resource.id)"
                                 class="w-4 animate-spin"/>
                    <span>{{ t("deckEducationalResources.actions.attach") }}</span>
                  </span>
                </Button>
              </div>
            </article>
          </div>

          <div v-if="visibleAvailableResources.length === 0"
               class="empty-state mt-6">
            <EducationalResourcesIntroductionIcon class="icon-dynamic w-24"/>
            <h4 class="text-xl font-semibold text-center">
              {{ t("deckEducationalResources.sections.library.emptyTitle") }}
            </h4>
            <p class="max-w-md text-center text-sm text-muted">
              {{
                hasSearch
                    ? t("deckEducationalResources.sections.shared.emptySearch")
                    : t("deckEducationalResources.sections.library.emptyDescription")
              }}
            </p>
          </div>
        </section>
      </div>
    </div>
  </QueryState>
</template>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  width: min(100%, 32rem);
}

.sections {
  display: grid;
  align-items: start;
  gap: 1.5rem;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--width-educational-resource)), 1fr));
  gap: 3.75rem;
}

.resource-card {
  display: grid;
  grid-template-rows: 13rem 1fr auto;
  width: 100%;
  overflow: hidden;
  border-radius: 1.5rem;
}

.resource-card__cover {
  position: relative;
  height: 13rem;
  overflow: hidden;
}

.resource-card__badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--color-border-default);
  border-radius: 9999px;
  background-color: var(--color-surface-primary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-semibold);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;
  border: 1px dashed var(--color-border-default);
  border-radius: 1.5rem;
  background-color: var(--color-surface-tertiary);
}
</style>

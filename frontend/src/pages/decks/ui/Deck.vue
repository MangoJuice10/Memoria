<script setup lang="ts">
import {useRoute} from "vue-router";
import {getIdRouteParam} from "@/app/router";
import DeckPanel from "./DeckPanel.vue";
import {useQuery} from "@tanstack/vue-query";
import {decksApi, decksQueryKeys} from "@/entities/deck";
import {QueryState} from "@/shared/ui";
import {computed} from "vue";

const route = useRoute();

const deckId = computed(() => getIdRouteParam(route.params.deckId));

const {data, isLoading, error} = useQuery({
  queryKey: computed(() => decksQueryKeys.byId(deckId.value)),
  queryFn: () => decksApi.findOne(deckId.value)
});

</script>

<template>
  <div class="flex flex-col
              min-h-screen pb-page
              bg-tertiary">
    <QueryState :is-loading
                :error
                class="grow flex flex-col">
      <div v-if="data" class="grow flex flex-col">
        <DeckPanel
            :id="data.id"
            :name="data.name"
            :is-public="data.isPublic"
            class="px-page"/>
        <RouterView v-slot="{ Component }">
          <component :is="Component"
                     :id="data.id"
                     :name="data.name"
                     :description="data.description"
                     :is-public="data.isPublic"
                     :cover-url="data.coverUrl"
                     class="grow px-page"/>
        </RouterView>
      </div>
    </QueryState>
  </div>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {getIdRouteParam} from "@/app/router";
import DeckPanel from "./DeckPanel.vue";
import {useQuery} from "@tanstack/vue-query";
import {decksApi, decksQueryKeys} from "@/entities/deck";
import {ref, watch} from "vue";
import {QueryState} from "@/shared/ui";

const route = useRoute();

const deckId = getIdRouteParam(route.params.deckId);

const {data, isLoading, error} = useQuery({
  queryKey: decksQueryKeys.byId(deckId),
  queryFn: () => decksApi.findOne(deckId)
});

const isPublic = ref<boolean>(false);

watch(data, (deck) => {
  if (deck) isPublic.value = deck.isPublic;
});

</script>

<template>
  <div class="flex flex-col
              min-h-screen
              bg-tertiary">
    <QueryState :is-loading
                :error
                class="grow flex flex-col">
      <div v-if="data" class="grow flex flex-col">
        <DeckPanel
            :id="data.id"
            :name="data.name"
            v-model:is-public="isPublic"
            class="px-page"/>
        <RouterView v-slot="{ Component }">
          <component :is="Component"
                     :id="data.id"
                     :name="data.name"
                     :description="data.description"
                     :is-public="isPublic"
                     class="grow px-page"/>
        </RouterView>
      </div>
    </QueryState>
  </div>
</template>
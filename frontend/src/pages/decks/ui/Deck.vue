<script setup lang="ts">
import {useRoute} from "vue-router";
import {getIdRouteParam} from "@/app/router";
import {useI18n} from "vue-i18n";
import DeckPanel from "./DeckPanel.vue";
import {Toolbar} from "@/widgets/toolbar";
import {LearningIcon} from "@/shared/ui/icons";
import {IconLabel, Button, LocalizedLink} from "@/shared/ui";
import {useQuery} from "@tanstack/vue-query";
import {decksApi, decksQueryKeys} from "@/entities/deck";

const route = useRoute();
const {t} = useI18n();

const deckId = getIdRouteParam(route.params.deckId);

const {data} = useQuery({
  queryKey: decksQueryKeys.byId(deckId),
  queryFn: () => decksApi.findOne(deckId)
});

</script>

<template>
  <div class="flex flex-col
              min-h-screen
              bg-tertiary">
    <DeckPanel v-if="data"
               :id="data.id"
               :name="data.name"
               :is-public="data.isPublic"
               class="px-page"/>
    <div class="flex justify-between items-center
                mb-10 px-page">
      <Toolbar/>
      <LocalizedLink name="review" :params="{deckId: String(deckId)}">
        <Button>
          <IconLabel>
            <template #label>
              {{ $t("actions.study") }}
            </template>
            <template #icon>
              <LearningIcon class="icon-static-inverse w-7"/>
            </template>
          </IconLabel>
        </Button>
      </LocalizedLink>
    </div>
    <RouterView v-if="data"
                v-slot="{ Component }">
      <component :is="Component"
                 :id="data.id"
                 :name="data.name"
                 :description="data.description"
                 :is-public="data.isPublic"
                 class="grow px-page"/>
    </RouterView>
  </div>
</template>
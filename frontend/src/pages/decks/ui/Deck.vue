<script setup lang="ts">
import {ref} from "vue";
import Panel from "./Panel.vue";
import {Toolbar} from "@/widgets/toolbar";
import {LearningIcon} from "@/shared/ui/icons";
import {IconLabel, Button, LocalizedLink} from "@/shared/ui";
import {useRoute} from "vue-router";
import {getIdRouteParam} from "@/app/router";

const isPublic = ref(false);
const route = useRoute();

const deckId = getIdRouteParam(route.params.deckId);
</script>

<template>
  <div class="flex flex-col
              min-h-screen
              bg-tertiary">
    <Panel class="px-page"/>
    <div class="flex justify-between items-center
                mb-10 px-page">
      <Toolbar/>
      <LocalizedLink name="review" :params="{deckId: String(deckId)}">
        <Button>
          <IconLabel>
            <template #label>
              Start Learning
            </template>
            <template #icon>
              <LearningIcon class="icon-static-inverse w-7"/>
            </template>
          </IconLabel>
        </Button>
      </LocalizedLink>
    </div>
    <RouterView class="grow px-page"/>
  </div>
</template>

<style scoped>

</style>
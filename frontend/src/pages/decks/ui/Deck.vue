<script setup lang="ts">
import {ref} from "vue";
import Panel from "./Panel.vue";
import {Toolbar} from "@/widgets/toolbar";
import {LearningIcon} from "@/shared/ui/icons";
import {IconLabel, Button} from "@/shared/ui";

const isPublic = ref(false);

</script>

<template>
  <div class="flex flex-col
              min-h-screen
              bg-tertiary">
    <Panel class="px-page"/>
    <div class="flex justify-between items-center
                mb-10 px-page">
      <Toolbar/>
      <Button>
        <IconLabel>
          <template #label>
            Start Learning
          </template>
          <template #icon>
            <LearningIcon class="w-7"/>
          </template>
        </IconLabel>
      </Button>
    </div>
    <RouterView class="grow px-page"/>
  </div>
</template>

<style scoped>

</style>
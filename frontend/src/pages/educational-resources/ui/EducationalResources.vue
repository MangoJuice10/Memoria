<script setup lang="ts">
import {QueryState} from "@/shared/ui";
import {CreateEducationalResource} from "@/entities/educational-resource";
import {EducationalResourceCard} from "@/entities/educational-resource";
import {
  createFindAllEducationalResourcesQuery
} from "@/entities/educational-resource/api/queries/create-find-all-educational-resources.query.ts";

const findAllEducationalResourcesQuery = createFindAllEducationalResourcesQuery();
</script>

<template>
  <div class="flex flex-col
              min-h-screen px-page py-page
              bg-tertiary">
    <QueryState :is-loading="findAllEducationalResourcesQuery.isLoading.value"
                :error="findAllEducationalResourcesQuery.error.value"
                class="grow">
      <div v-if="findAllEducationalResourcesQuery.data.value"
           class="educational-resources
                  pt-10">
        <CreateEducationalResource/>
        <EducationalResourceCard v-for="educationalResource in findAllEducationalResourcesQuery.data.value"
                                 :id="educationalResource.id"
                                 :name="educationalResource.name"
                                 :description="educationalResource.description"
                                 :file-url="educationalResource.fileUrl"
                                 :cover-url="educationalResource.coverUrl"
                                 :original-filename="educationalResource.originalFilename"
                                 :created-at="educationalResource.createdAt"/>
      </div>
    </QueryState>
  </div>
</template>

<style scoped>
.educational-resources {
  display: grid;
  grid-template-columns: repeat(1, var(--width-educational-resource));
  justify-content: space-between;
  gap: 3.75rem;
}

@media (min-width: 40rem) {
  .educational-resources {
    grid-template-columns: repeat(2, var(--width-educational-resource));
  }
}

@media (min-width: 48rem) {
  .educational-resources {
    grid-template-columns: repeat(3, var(--width-educational-resource));
  }
}

@media (min-width: 64rem) {
  .educational-resources {
    grid-template-columns: repeat(4, var(--width-educational-resource));
  }
}

@media (min-width: 80rem) {
  .educational-resources {
    grid-template-columns: repeat(4, var(--width-educational-resource));
  }
}

@media (min-width: 96rem) {
  .educational-resources {
    grid-template-columns: repeat(4, var(--width-educational-resource));
  }
}
</style>
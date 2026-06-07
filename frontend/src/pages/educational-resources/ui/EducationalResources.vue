<script setup lang="ts">
/* ===== AI GENERATED CODE START ===== */
import {ref, computed} from "vue";
/* ===== AI GENERATED CODE END ===== */
import {QueryState, Searchbar} from "@/shared/ui";
import {CreateEducationalResource} from "@/entities/educational-resource";
import {EducationalResourceCard} from "@/entities/educational-resource";
import {
  createFindAllEducationalResourcesQuery
} from "@/entities/educational-resource/api/queries/create-find-all-educational-resources.query.ts";
/* ===== AI GENERATED CODE START ===== */
import {EducationalResourcesIntroductionIcon} from "@/shared/ui";
/* ===== AI GENERATED CODE END ===== */

const findAllEducationalResourcesQuery = createFindAllEducationalResourcesQuery();

/* ===== AI GENERATED CODE START ===== */
const searchQuery = ref("");

const allResources = computed(() => findAllEducationalResourcesQuery.data.value ?? []);

// Filter resources by search query
const filteredResources = computed(() => {
  if (!searchQuery.value.trim()) {
    return allResources.value;
  }

  const query = searchQuery.value.toLowerCase();
  return allResources.value.filter(resource =>
    resource.name.toLowerCase().includes(query) ||
    resource.description.toLowerCase().includes(query) ||
    resource.originalFilename.toLowerCase().includes(query)
  );
});
/* ===== AI GENERATED CODE END ===== */
</script>

<template>
  <div class="flex flex-col min-h-screen bg-tertiary">
    <!-- ===== AI GENERATED CODE START ===== -->
    <!-- Page header with search -->
    <section class="px-page pt-10 pb-10 mb-8">
      <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
        <div class="flex flex-col gap-6">
          <!-- Title -->
          <div class="flex gap-5">
            <div class="p-4 rounded-2xl border border-default">
              <EducationalResourcesIntroductionIcon class="icon-static w-12"/>
            </div>
            <div>
              <h1 class="text-3xl font-bold tracking-tight">My Resources</h1>
              <p class="mt-2 text-base text-muted leading-relaxed">
                Manage and organize your educational resources
              </p>
            </div>
          </div>

          <!-- Search bar -->
          <Searchbar v-model="searchQuery" placeholder="Search resources by name, description, or filename..."/>
        </div>
      </div>
    </section>
    <!-- ===== AI GENERATED CODE END ===== -->

    <div class="px-page pb-page">
      <QueryState :is-loading="findAllEducationalResourcesQuery.isLoading.value"
                  :error="findAllEducationalResourcesQuery.error.value"
                  class="grow">
        <!-- ===== AI GENERATED CODE START ===== -->
        <div class="educational-resources">
          <CreateEducationalResource/>
          <EducationalResourceCard v-for="educationalResource in filteredResources"
                                   :key="educationalResource.id"
                                   :id="educationalResource.id"
                                   :name="educationalResource.name"
                                   :description="educationalResource.description"
                                   :file-url="educationalResource.fileUrl"
                                   :cover-url="educationalResource.coverUrl"
                                   :original-filename="educationalResource.originalFilename"
                                   :created-at="educationalResource.createdAt"/>
        </div>
        <!-- ===== AI GENERATED CODE END ===== -->
      </QueryState>
    </div>
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
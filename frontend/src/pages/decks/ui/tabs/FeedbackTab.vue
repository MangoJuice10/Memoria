<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useQuery} from "@tanstack/vue-query";
import {getIdRouteParam} from "@/app/router";
import {feedbackQueryKeys, FeedbackCard} from "@/entities/feedback";
import {client, type SuccessResponse} from "@/shared/api";
import type {FeedbackResponseDto} from "@/entities/feedback";
import {QueryState} from "@/shared/ui";

const route = useRoute();
const deckId = computed(() => getIdRouteParam(route.params.deckId));

// Uses the owner-scoped endpoint (GET /decks/:deckId/feedback) which is
// protected by DeckOwnershipGuard and works for both public and private decks.
const {data: feedbackList, isLoading, error} = useQuery({
  queryKey: computed(() => feedbackQueryKeys.byDeck(deckId.value)),
  queryFn: async () => {
    const { data: { data } } = await client.get<SuccessResponse<FeedbackResponseDto[]>>(
      `/decks/${deckId.value}/feedback`
    );
    return data;
  },
});
</script>

<template>
  <QueryState :is-loading :error class="grow">
    <div class="flex flex-col gap-4 py-6">

      <div v-if="feedbackList && feedbackList.length > 0"
           class="flex flex-col gap-7.5">
        <FeedbackCard
          v-for="feedback in feedbackList"
          :key="feedback.id"
          :feedback="feedback"
        />
      </div>

      <div v-else
           class="flex flex-col items-center gap-3 py-12
                  border border-dashed border-default rounded-2xl
                  bg-tertiary text-center">
        <p class="text-lg font-semibold">No feedback yet</p>
        <p class="text-sm text-muted max-w-xs">
          Feedback will appear here once this deck is shared publicly and other users leave reviews.
        </p>
      </div>

    </div>
  </QueryState>
</template>

<script setup lang="ts">
import type {FeedbackResponseDto} from "../model/feedback-response.dto";
import StarIcon from "@/shared/ui/icons/common/StarIcon.vue";

defineProps<{
  feedback: FeedbackResponseDto;
}>();

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}
</script>

<template>
  <article
    class="flex flex-col gap-2
           p-4 rounded-xl border border-default
           bg-primary"
    :aria-label="`Feedback by ${feedback.authorUsername}`"
  >
    <header class="flex items-center justify-between gap-3">
      <span class="text-base font-semibold">{{ feedback.authorUsername }}</span>
      <div class="flex items-center gap-0.5" :aria-label="`Rating: ${feedback.rating} out of 5`">
        <StarIcon
          v-for="star in 5"
          :key="star"
          class="w-4 h-4"
          :class="star <= feedback.rating ? 'icon-static-inverse' : 'icon-static'"
          :aria-hidden="true"
        />
      </div>
    </header>

    <p class="text-base leading-relaxed">{{ feedback.content }}</p>

    <footer class="text-sm opacity-60 mt-1">
      {{ formatDate(feedback.createdAt) }}
    </footer>
  </article>
</template>

<script setup lang="ts">
import type {ReviewRating} from "src/pages/review/model/review.dto";
import {Button} from "@/shared/ui";

defineEmits<{
  (e: "rating-change", value: ReviewRating): void;
}>();
</script>

<template>
  <div class="flex items-center gap-10">
    <Button color="var(--color-again)"
            color-hover="var(--color-again)"
            color-active="var(--color-again)"
            color-text-hover="var(--color-text-inverse)"
            color-text-active="var(--color-text-inverse)"
            class="w-button h-button
                   bg-again"
            @click="$emit('rating-change', 'AGAIN')">
      {{ $t("actions.rating.again") }}
    </Button>
    <Button color="var(--color-bad)"
            color-hover="var(--color-bad)"
            color-active="var(--color-bad)"
            color-text-hover="var(--color-text-inverse)"
            color-text-active="var(--color-text-inverse)"
            class="w-button h-button
                   bg-bad!"
            @click="$emit('rating-change', 'BAD')">
      {{ $t("actions.rating.bad") }}
    </Button>
    <Button color="var(--color-good)"
            color-hover="var(--color-good)"
            color-active="var(--color-good)"
            color-text-hover="var(--color-text-inverse)"
            color-text-active="var(--color-text-inverse)"
            class="w-button h-button
                   bg-good!"
            @click="$emit('rating-change', 'GOOD')">
      {{ $t("actions.rating.good") }}
    </Button>
    <Button color="var(--color-perfect)"
            color-hover="var(--color-perfect)"
            color-active="var(--color-perfect)"
            color-text-hover="var(--color-text-inverse)"
            color-text-active="var(--color-text-inverse)"
            class="w-button h-button
                   bg-perfect!"
            @click="$emit('rating-change', 'PERFECT')">
      {{ $t("actions.rating.perfect") }}
    </Button>
  </div>
</template>
<script setup lang="ts">
import type {ReviewRating} from "@/entities/flashcard";
import {Button} from "@/shared/ui";

defineEmits<{
  (e: "rating-change", value: ReviewRating): void;
}>();
</script>

<template>
  <div class="flex items-center gap-10">
    <Button :has-color="false"
            :has-hover-color="false"
            :has-active-color="false"
            class="w-button h-button
                   bg-again"
            @click="$emit('rating-change', 'AGAIN')">
      {{ $t("actions.rating.again") }}
    </Button>
    <Button :has-color="false"
            :has-hover-color="false"
            :has-active-color="false"
            class="w-button h-button
                   bg-bad!"
            @click="$emit('rating-change', 'BAD')">
      {{ $t("actions.rating.bad") }}
    </Button>
    <Button :has-color="false"
            :has-hover-color="false"
            :has-active-color="false"
            class="w-button h-button
                   bg-good!"
            @click="$emit('rating-change', 'GOOD')">
      {{ $t("actions.rating.good") }}
    </Button>
    <Button :has-color="false"
            :has-hover-color="false"
            :has-active-color="false"
            class="w-button h-button
                   bg-perfect!"
            @click="$emit('rating-change', 'PERFECT')">
      {{ $t("actions.rating.perfect") }}
    </Button>
  </div>
</template>
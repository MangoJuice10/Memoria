<script setup lang="ts">
import {ref} from "vue";
import {useValidation} from "@/shared/lib";
import {Form, FormField, StarIcon} from "@/shared/ui";
import {createFeedbackSchema, type CreateFeedbackDto} from "../model/create-feedback.schema";
import {createCreateFeedbackMutation} from "../api/mutations/create-feedback.mutation";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
/* ===== AI GENERATED CODE START ===== */
import {useI18n} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();
/* ===== AI GENERATED CODE END ===== */

const props = defineProps<{
  sharedDeckId: number;
}>();

const emit = defineEmits<{
  submitted: [];
}>();

const data = ref<CreateFeedbackDto>({
  content: "",
  rating: 0,
});

// Track hover position for star preview
const hoverRating = ref(0);

const {
  isValid,
  getError,
  getFormError,
  isFieldTouched,
  touchAll,
  clientValidate,
  serverValidate,
  reset,
} = useValidation(data, createFeedbackSchema, {
  mode: "eager",
  delay: 300,
});

const createFeedbackMutation = createCreateFeedbackMutation(props.sharedDeckId);

const submit = async () => {
  touchAll();
  const result = await clientValidate();
  if (!result.success) return;

  try {
    await createFeedbackMutation.mutateAsync(result.data);
    reset();
    emit("submitted");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};

function setRating(value: number) {
  data.value.rating = value;
  clientValidate();
}
</script>

<template>
  <Form
    :form-error="getFormError()"
    :is-submit-enabled="isValid"
    :is-reset-enabled="true"
    form-controls-classes="mt-0!"
    class="text-base"
    @submit="submit"
    @reset="reset"
  >
    <template #fields>
      <div class="flex flex-col gap-6">
        <!-- Star rating picker -->
        <div class="flex flex-col gap-2">
          <span class="font-semibold mb-1">{{ t(codeToKey(codes.FEEDBACK_RATING)) }}</span>
          <div
            class="flex items-center gap-2.5"
            @mouseleave="hoverRating = 0"
          >
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              class="transition-all duration-200 ease-out hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm will-change-transform"
              :aria-label="t(codeToKey(codes.FEEDBACK_RATE_OUT_OF_5), {n: star})"
              @mouseenter="hoverRating = star"
              @click="setRating(star)"
            >
              <StarIcon
                class="w-8 h-8 transition-all duration-200 ease-out will-change-transform"
                :class="[
                  star <= (hoverRating || data.rating) ? 'icon-static-inverse opacity-100' : 'icon-static opacity-60',
                  { 'scale-110 opacity-100': star === hoverRating },
                  { 'ring-2 ring-accent rounded-sm opacity-100': star === data.rating && data.rating > 0 && hoverRating === 0 }
                ]"
              />
            </button>
            <span 
              v-if="data.rating > 0" 
              class="ml-2 text-base text-muted transition-opacity duration-200 ease-out"
              :class="{ 'opacity-0': hoverRating > 0, 'opacity-100': hoverRating === 0 }"
            >
              {{ data.rating }} / 5
            </span>
          </div>
          <p v-if="isFieldTouched('rating') && getError('rating')" class="text-sm text-error font-semibold">
            {{ t(codeToKey(codes.FEEDBACK_RATING_REQUIRED)) }}
          </p>
        </div>
        
        <FormField
          v-model="data.content"
          variant="textarea"
          id="feedback-content"
          :label="t(codeToKey(codes.FEEDBACK_CONTENT))"
          :placeholder="t(codeToKey(codes.FEEDBACK_CONTENT_PLACEHOLDER))"
          :touched="isFieldTouched('content')"
          :error="getError('content')"
          @blur="clientValidate"
        />
      </div>
    </template>

    <template #submit>
      {{ t(codeToKey(codes.FEEDBACK_SUBMIT)) }}
    </template>
  </Form>
</template>

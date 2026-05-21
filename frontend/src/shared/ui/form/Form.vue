<script setup lang="ts">
import FormError from "./FormError.vue";
import {Button} from "@/shared/ui";
import type {ErrorMessage} from "@/shared/model";

withDefaults(defineProps<{
  formError: ErrorMessage;
  isSubmitEnabled: boolean;
  isResetEnabled: boolean;
  hasStickyControls?: boolean;
  formErrorClasses?: string;
  formControlsClasses?: string;
  submitClasses?: string;
  resetClasses?: string;
}>(), {
  hasStickyControls: false,
});

defineEmits<{
  submit: [],
  reset: []
}>();
</script>

<template>
  <form class="flex flex-col gap-4">
    <div>
      <div v-if="$slots.heading">
        <slot name="heading"/>
      </div>
      <div v-else-if="$slots['heading-content']">
        <h2>
          <slot name="heading-content"/>
        </h2>
      </div>
      <FormError :error="formError"
                 class="mb-2 text-lg"
                 :class="formErrorClasses"/>
    </div>
    <slot name="fields"/>
    <div class="flex justify-between items-center
                mt-10"
         :class="[
                    hasStickyControls && 'sticky bottom-5\n'+
                                         'w-8/10 mx-auto p-5 border rounded-2xl border-default\n'+
                                         'bg-(--color-primary)/85',
                    formControlsClasses
                 ]">
      <Button type="submit"
              :class="submitClasses"
              :disabled="!isSubmitEnabled"
              @click.prevent="$emit('submit')"
              data-testid="submit">
        <slot name="submit" v-if="$slots.submit"/>
        <div v-else>
          {{ $t("form.actions.submit") }}
        </div>
      </Button>
      <Button type="reset"
              :class="resetClasses"
              :disabled="!isResetEnabled"
              @click.prevent="$emit('reset')"
              data-testid="reset">
        <slot name="reset" v-if="$slots.reset"/>
        <div v-else>
          {{ $t("form.actions.reset") }}
        </div>
      </Button>
    </div>
  </form>
</template>
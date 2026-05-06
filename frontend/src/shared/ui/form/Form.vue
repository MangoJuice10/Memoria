<script setup lang="ts">
import {Button, Error} from "@/shared/ui";
import type {ErrorMessage} from "@/shared/model";

defineProps<{
  formError: ErrorMessage;
  isSubmitEnabled: boolean;
  isResetEnabled: boolean;
  formErrorClasses?: string;
  submitClasses?: string;
  resetClasses?: string;
}>();

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
      <Error :error="formError"
             class="mb-2"
             :class="formErrorClasses"/>
    </div>
    <slot name="fields"/>
    <div class="flex justify-between items-center">
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
<script setup lang="ts">
import {ArrowIcon, FlipIcon} from "@/shared/ui/icons";
import {Button, IconLabel} from "@/shared/ui";

defineProps<{
  isPreviousEnabled: boolean;
  isNextEnabled: boolean;
}>();

defineEmits<{
  "flip": [];
  "previous": [];
  "next": [];
}>();

</script>

<template>
  <div class="flex items-center gap-10">
    <Button :enabled="isPreviousEnabled"
            class="w-button h-button"
            @click="$emit('previous')">
      <IconLabel class="gap-2.5">
        <template #icon>
          <ArrowIcon class="icon-static-inverse w-7 h-7
                              rotate-180"/>
        </template>
        <template #label>
          {{ $t("actions.previous") }}
        </template>
      </IconLabel>
    </Button>
    <Button class="w-button h-button"
            @click="$emit('flip')">
      <IconLabel class="gap-2.5">
        <template #icon>
          <FlipIcon class="icon-static-inverse w-7 h-7"/>
        </template>
        <template #label>
          {{ $t("actions.flip") }}
        </template>
      </IconLabel>
    </Button>
    <Button :enabled="isNextEnabled"
            class="w-button h-button"
            @click="$emit('next')">
      <IconLabel is-reverse
                 class="gap-2.5">
        <template #icon>
          <ArrowIcon class="icon-static-inverse w-7 h-7"/>
        </template>
        <template #label>
          {{ $t("actions.next") }}
        </template>
      </IconLabel>
    </Button>
  </div>
</template>
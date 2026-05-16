<script setup lang="ts">
import {type ToastProps, type ToastTypeId, useToastStore} from "@/shared/model";
import {CloseIcon, IconButton, IconLabel} from "@/shared/ui";
import {computed} from "vue";

const props = defineProps<ToastProps>();

const {pop} = useToastStore();

const toastColors = {
  success: "var(--color-success)",
  error: "var(--color-error)",
  warning: "var(--color-warning)",
  info: "var(--color-info)"
} as const satisfies Record<ToastTypeId, `var(--${string})`>;

const style = computed(() => ({
  "--toast-duration": `${props.duration}ms`,
  "--toast-color": `${toastColors[props.type]}`
}));

</script>
<template>
  <div class="toast
              flex justify-between items-center gap-5
              p-5 border-t border-r border-l rounded-2xl border-default
              text-base
              bg-primary shadow-lg
              transition duration-150
              hover:scale-105"
       :style>
    <IconLabel>
      <template #icon>
        <component :is="icon"
                   class="w-7 h-7"/>
      </template>
      <template #label>
        <span>
          {{ message }}
        </span>
      </template>
    </IconLabel>
    <IconButton @click="pop(id)"
                class="opacity-80">
      <CloseIcon/>
    </IconButton>
  </div>
</template>

<style>
@keyframes drain {
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
}

.toast {
  position: relative;
  overflow: hidden;
  --toast-color: ;
  --toast-duration: ;
}

.toast::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  border-bottom: 0.25rem solid;
  border-radius: 0 0 1rem 0;
  border-bottom-color: var(--toast-color);
  pointer-events: none;
  animation: drain var(--toast-duration) linear forwards;
}
</style>
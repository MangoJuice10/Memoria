<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  enabled?: boolean;
  colorText?: string;
  colorTextHover?: string;
  colorTextActive?: string;
  colorTextDisabled?: string;
  color?: string;
  colorHover?: string;
  colorActive?: string;
  colorDisabled?: string;
  is3D?: boolean,
}>(), {
  enabled: true,
  colorText: "var(--color-text-inverse)",
  colorTextHover: "var(--color-text-hover)",
  colorTextActive: "var(--color-text-active)",
  colorTextDisabled: "var(--color-text-disabled)",
  color: "var(--color-secondary)",
  colorHover: "var(--color-surface-hover)",
  colorActive: "var(--color-primary)",
  colorDisabled: "var(--color-surface-disabled)",
  is3D: true,
});

const style = computed(() => ({
  "--button-color-text": `${props.colorText}`,
  "--button-color-text-hover": `${props.colorTextHover}`,
  "--button-color-text-active": `${props.colorTextActive}`,
  "--button-color-text-disabled": `${props.colorTextDisabled}`,
  "--button-color": `${props.color}`,
  "--button-color-active": `${props.colorActive}`,
  "--button-color-hover": `${props.colorHover}`,
  "--button-color-disabled": `${props.colorDisabled}`,
}));
</script>

<template>
  <button :disabled="!enabled"
          class="button
                 flex justify-center items-center
                 min-w-fit p-button border border-default rounded-xl
                 font-semibold
                 transition-all ease-in duration-100
                 enabled:hover:scale-105"
          :class="[
                    'enabled:text-(--button-color-text) enabled:bg-(--button-color)',
                    'enabled:hover:text-(--button-color-text-hover) enabled:hover:bg-(--button-color-hover)',
                    'enabled:active:text-(--button-color-text-active) enabled:active:bg-(--button-color-active)',
                    'disabled:text-(--button-color-text-disabled) disabled:bg-(--button-color-disabled)',
                    {
                      [
                        'enabled:shadow-[0px_4px_0px_0px_var(--button-color),0px_5px_0px_0px_var(--color-border-default)]\n' +
                        'disabled:shadow-[0px_4px_0px_0px_var(--button-color-disabled),0px_5px_0px_0px_var(--color-border-default)]\n' +
                        'enabled:active:translate-y-1\n' +
                        'enabled:active:shadow-none'
                      ]: is3D,
                      'enabled:hover:shadow-[0px_4px_0px_0px_var(--button-color-hover),0px_5px_0px_0px_var(--color-border-default)]': is3D
                    }
                  ]"
          :style>
    <slot/>
  </button>
</template>

<style scoped>
.button {
  --button-color-text: ;
  --button-color-text-hover: ;
  --button-color-text-active: ;
  --button-color-text-disabled: ;
  --button-color: ;
  --button-color-hover: ;
  --button-color-active: ;
  --button-color-disabled: ;
}
</style>
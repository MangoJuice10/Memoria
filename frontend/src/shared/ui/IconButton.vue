<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  enabled?: boolean;
  sizeRem?: number;
  hasRing?: boolean;
  ringMarginPercent?: number;
  hasColor?: boolean;
  colorPrimary?: string;
  colorSecondary?: string;
  colorHoverPrimary?: string;
  colorHoverSecondary?: string;
}>(), {
  enabled: true,
  sizeRem: 1.8,
  hasRing: false,
  ringMarginPercent: 0,
  hasColor: true,
  colorPrimary: "var(--color-primary)",
  colorSecondary: "var(--color-secondary)",
  colorHoverPrimary: "var(--color-secondary)",
  colorHoverSecondary: "var(--color-primary)",
});

const style = computed(() => ({
  "width": `${props.sizeRem}rem`,
  "min-width": `${props.sizeRem}rem`,
  "height": `${props.sizeRem}rem`,
  "min-height": `${props.sizeRem}rem`,
  "--icon-button-ring-margin": `${props.ringMarginPercent}%`,
  "--icon-button-color-primary": `${props.colorPrimary}`,
  "--icon-button-color-secondary": `${props.colorSecondary}`,
  "--icon-button-color-hover-primary": `${props.colorHoverPrimary}`,
  "--icon-button-color-hover-secondary": `${props.colorHoverSecondary}`
}));

</script>
<template>
  <button :disabled="!enabled"
          class="border rounded-full border-transparent
                 focus-visible:border-default focus-visible:bg-focus
                 transition-all duration-100
                 enabled:hover:scale-105 enabled:active:scale-110"
          :class="[
                    hasRing && 'icon-button-ring\n' +
                               'enabled:hover:border-default enabled:hover:bg-hover\n' +
                               'cursor-pointer',
                    hasColor && 'icon-button-colors'
                  ]"
          :style
          @click.prevent>
    <slot/>
  </button>
</template>

<style scoped>
.icon-button-ring:enabled {
  --icon-button-ring-margin: ;
}

.icon-button-colors {
  --icon-button-color-primary: ;
  --icon-button-color-secondary: ;
  --icon-button-color-hover-primary: ;
  --icon-button-color-hover-secondary: ;
}

.icon-button-colors:enabled {
  --color-icon-default: var(--icon-button-color-primary);
  --color-icon-inverse: var(--icon-button-color-secondary);
}

.icon-button-colors:disabled {
  --color-icon-inverse: var(--color-surface-disabled);
}

.icon-button-colors:enabled:hover {
  --color-icon-default: var(--icon-button-color-hover-primary);
  --color-icon-inverse: var(--icon-button-color-hover-secondary);
}


:slotted(:first-child) {
  margin: var(--icon-button-ring-margin);
}
</style>
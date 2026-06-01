<script setup lang="ts">
import {type ClassValue, computed, ref} from "vue";
import {ChevronIcon, PinIcon} from "@/shared/ui/icons";

type Side =
    | "top"
    | "bottom";

type Align =
    | "left"
    | "center"
    | "right";

const props = withDefaults(defineProps<{
  isRelative?: boolean;
  side?: Side;
  align?: Align;
  gapRem?: number;
  hasArrow?: boolean;
  hasPin?: boolean;
  triggerClasses?: ClassValue;
  arrowClasses?: ClassValue;
  pinClasses?: ClassValue;
  menuClasses?: ClassValue;
}>(), {
  isRelative: true,
  side: "bottom",
  align: "left",
  gapRem: 1.8,
  hasArrow: false,
  hasPin: false,
  triggerClasses: "",
  arrowClasses: "",
  pinClasses: "",
  menuClasses: ""
});

const menuStyle = computed(() =>
    props.side === "top"
        ? {"padding-bottom": `${props.gapRem}rem`}
        : {"padding-top": `${props.gapRem}rem`}
);

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

</script>

<template>
  <div class="group/dropdown"
       :class="isRelative && 'relative'">
    <div class="peer/trigger
                flex justify-center items-center gap-2
                cursor-pointer"
         :class="[
                   isOpen
                      ? 'border-default text-inverse bg-secondary'
                      : 'group-hover/dropdown:border-default group-hover/dropdown:bg-hover',
                   triggerClasses
                 ]"
         @click="toggle">
      <slot name="trigger"/>
      <ChevronIcon v-if="hasArrow"
                   class="icon-dynamic-inverse
                        transition-transform duration-400"
                   :class="[
                            side === 'top'
                               ? isOpen ? 'rotate-180' : 'group-hover/dropdown:rotate-180'
                               : isOpen ? '' : 'rotate-180 group-hover/dropdown:rotate-0',
                            arrowClasses
                         ]"/>
      <PinIcon v-if="hasPin"
               class="transition-all duration-500"
               :class="[
                          isOpen
                              ? 'icon-dynamic-inverse rotate-0 scale-110'
                              : 'icon-dynamic-disabled -rotate-45 scale-100',
                          pinClasses
                       ]"/>
    </div>
    <div class="absolute z-10
                transition-all duration-400 ease-out"
         :class="[
                   side === 'top'
                     ? 'bottom-full'
                     : 'top-full',
                   align === 'right'
                     ? 'left-0'
                     : align === 'left'
                       ? 'right-0'
                       : 'left-1/2 -translate-x-1/2',
                   isOpen
                     ? ''
                     : (side === 'top' ? 'translate-y-10\n' : '-translate-y-10\n') +
                       'opacity-0 pointer-events-none\n' +
                       'group-hover/dropdown:opacity-100 peer-hover/trigger:opacity-100\n' +
                       'group-hover/dropdown:translate-y-0 peer-hover/trigger:translate-y-0\n' +
                       'group-hover/dropdown:pointer-events-auto peer-hover/trigger:pointer-events-auto',
                    menuClasses
                 ]"
         :style="menuStyle">
      <slot name="menu"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {IconLabel, LocalizedLink} from "@/shared/ui";
import {type ClassValue, toValue} from "vue";

defineProps<{
  menuItemView: MenuItemView<string | number>,
  iconClasses?: ClassValue;
  labelClasses?: ClassValue;
  inactiveClasses?: ClassValue;
  activeClasses?: ClassValue;
  activeIconClasses?: ClassValue;
  activeLabelClasses?: ClassValue;
}>();
</script>

<template>
  <LocalizedLink v-if="menuItemView.routeName"
                 :name="menuItemView.routeName!"
                 :params="menuItemView.routeParams"
                 :class="toValue(menuItemView.isActive) ? activeClasses : inactiveClasses"
                 @click.stop="menuItemView.callback?.()">
    <IconLabel v-if="menuItemView.icon"
               class="gap-1.5">
      <template #icon>
        <component :is="menuItemView.icon"
                   :class="[
                              iconClasses,
                              toValue(menuItemView.isActive) && activeIconClasses
                           ]"/>
      </template>
      <template #label>
          <span class="px-3 py-1"
                :class="[
                            labelClasses,
                            toValue(menuItemView.isActive) && activeLabelClasses
                        ]">
            {{ menuItemView.label }}
          </span>
      </template>
    </IconLabel>
    <div v-else>
      <div class="px-3 py-1"
           :class="[
                       labelClasses,
                       toValue(menuItemView.isActive) && activeLabelClasses
                   ]">
        {{ menuItemView.label }}
      </div>
    </div>
  </LocalizedLink>
  <div v-else
       class="cursor-pointer"
       :class="toValue(menuItemView.isActive) ? activeClasses : inactiveClasses"
       @click.stop="menuItemView.callback?.()">
    <IconLabel v-if="menuItemView.icon">
      <template #icon>
        <component :is="menuItemView.icon"
                   :class="[
                              iconClasses,
                              toValue(menuItemView.isActive) && activeIconClasses
                           ]"/>
      </template>
      <template #label>
      <span class="px-3 py-1"
            :class="[
                        labelClasses,
                        toValue(menuItemView.isActive) && activeLabelClasses
                    ]">
        {{ menuItemView.label }}
      </span>
      </template>
    </IconLabel>
    <div v-else>
      <div class="px-3 py-1">
        {{ menuItemView.label }}
      </div>
    </div>
  </div>
</template>
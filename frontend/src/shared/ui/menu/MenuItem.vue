<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";
import {IconLabel, LocalizedLink} from "@/shared/ui";
import {type ClassValue, toValue} from "vue";

defineProps<{
  menuItemView: MenuItemView<string | number>,
  iconLabelClasses?: ClassValue,
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
    <IconLabel v-if="menuItemView.imageUrl || menuItemView.icon"
               class="gap-3"
               :class="iconLabelClasses">
      <template #icon>
        <img v-if="menuItemView.imageUrl"
             :src="menuItemView.imageUrl"
             alt=""
             class="rounded-full object-contain"
             :class="[
                        iconClasses,
                        toValue(menuItemView.isActive) && activeIconClasses
                     ]"/>
        <component v-else-if="menuItemView.icon"
                   :is="menuItemView.icon"
                   :class="[
                              iconClasses,
                              toValue(menuItemView.isActive) && activeIconClasses
                           ]"/>
      </template>
      <template #label>
          <span :class="[
                            labelClasses,
                            toValue(menuItemView.isActive) && activeLabelClasses
                        ]">
            {{ menuItemView.label }}
          </span>
      </template>
    </IconLabel>
    <div v-else>
      <div :class="[
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
    <IconLabel v-if="menuItemView.imageUrl || menuItemView.icon"
               class="gap-2.5"
               :class="iconLabelClasses">
      <template #icon>
        <img v-if="menuItemView.imageUrl"
             :src="menuItemView.imageUrl"
             alt=""
             class="rounded-full object-contain"
             :class="[
                        iconClasses,
                        toValue(menuItemView.isActive) && activeIconClasses
                     ]"/>
        <component v-else-if="menuItemView.icon"
                   :is="menuItemView.icon"
                   :class="[
                              iconClasses,
                              toValue(menuItemView.isActive) && activeIconClasses
                           ]"/>
      </template>
      <template #label>
      <span :class="[
                        labelClasses,
                        toValue(menuItemView.isActive) && activeLabelClasses
                    ]">
        {{ menuItemView.label }}
      </span>
      </template>
    </IconLabel>
    <div v-else>
      <div>
        {{ menuItemView.label }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {type NavigationItemView} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {IconLabel} from "@/shared/ui";

withDefaults(defineProps<{
  navigationItemView: NavigationItemView;
  isActive: boolean;
  iconClasses?: string;
  labelClasses?: string;
}>(), {
  iconClasses: "w-7.5"
});
</script>

<template>
  <LocalizedLink :name="navigationItemView.routeName"
                 :class="isActive
                 ? 'border-landing text-inverse bg-secondary'
                 : 'border-transparent text-landing hover:border-landing hover:bg-hover'">
    <IconLabel v-if="navigationItemView.icon">
      <template #icon>
        <component :is="navigationItemView.icon" :class="iconClasses"/>
      </template>
      <template #label>
        <span :class="labelClasses">
          {{ navigationItemView.label }}
        </span>
      </template>
    </IconLabel>
    <div v-else>
      <span :class="labelClasses">
          {{ navigationItemView.label }}
      </span>
    </div>
  </LocalizedLink>
</template>
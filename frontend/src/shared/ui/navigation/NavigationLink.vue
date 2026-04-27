<script setup lang="ts">
import {type NavigationItemView} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {IconLabel} from "@/shared/ui";

defineProps<{
  navigationItemView: NavigationItemView;
  iconClasses?: string;
  labelClasses?: string;
}>();
</script>

<template>
  <LocalizedLink :name="navigationItemView.routeName">
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

    </div>
  </LocalizedLink>
</template>
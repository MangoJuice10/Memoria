<script setup lang="ts">
import {type NavigationItemView} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {IconLabel} from "@/shared/ui";

defineProps<{
  navigationItem: NavigationItemView;
  iconClasses: string;
  labelClasses: string;
}>();
</script>

<template>
  <LocalizedLink :name="navigationItem.routeName">
    <IconLabel v-if="navigationItem.icon">
      <template #icon>
        <component :is="navigationItem.icon" :class="iconClasses"/>
      </template>
      <template #label>
        <span :class="labelClasses">
          {{ navigationItem.label }}
        </span>
      </template>
    </IconLabel>
    <div v-else>

    </div>
  </LocalizedLink>
</template>
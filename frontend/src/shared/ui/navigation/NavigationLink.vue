<script setup lang="ts">
import {type MenuItemView} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {IconLabel} from "@/shared/ui";
import {onMounted} from "vue";

const props = withDefaults(defineProps<{
  menuItemView: MenuItemView<string | number>;
  iconClasses?: string;
  labelClasses?: string;
}>(), {
  iconClasses: "w-7.5"
});

onMounted(() => {
  if (!props.menuItemView.routeName) throw new Error("The route name is missing");
})
</script>

<template>
  <LocalizedLink :name="menuItemView.routeName!">
    <IconLabel v-if="menuItemView.icon">
      <template #icon>
        <component :is="menuItemView.icon" :class="iconClasses"/>
      </template>
      <template #label>
        <span :class="labelClasses">
          {{ menuItemView.label }}
        </span>
      </template>
    </IconLabel>
    <div v-else>
      <div class="px-3 py-1"
            :class="labelClasses">
        {{ menuItemView.label }}
      </div>
    </div>
  </LocalizedLink>
</template>
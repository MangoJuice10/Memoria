<script setup lang="ts">
import {type MenuItemView, type NavigationItemId} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {IconLabel} from "@/shared/ui";
import {onMounted} from "vue";

const props = withDefaults(defineProps<{
  navigationItemView: MenuItemView<NavigationItemId>;
  isActive: boolean;
  iconClasses?: string;
  labelClasses?: string;
}>(), {
  iconClasses: "w-7.5"
});

onMounted(() => {
  if (!props.navigationItemView.routeName) throw new Error("The route name is missing");
})
</script>

<template>
  <LocalizedLink :name="navigationItemView.routeName!"
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
      <div class="px-3 py-1"
            :class="labelClasses">
          {{ navigationItemView.label }}
      </div>
    </div>
  </LocalizedLink>
</template>
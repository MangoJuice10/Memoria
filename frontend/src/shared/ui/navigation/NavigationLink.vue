<script setup lang="ts">
import {type MenuItemView, type NavigationItemId} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {IconLabel} from "@/shared/ui";
import {onMounted} from "vue";

const props = withDefaults(defineProps<{
  menuItemView: MenuItemView<NavigationItemId>;
  isActive: boolean;
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
  <LocalizedLink :name="menuItemView.routeName!"
                 :class="isActive
                 ? 'border-landing text-inverse bg-secondary'
                 : 'border-transparent text-landing hover:border-landing hover:bg-hover'">
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
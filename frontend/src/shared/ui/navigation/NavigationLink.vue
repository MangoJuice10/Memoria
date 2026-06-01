<script setup lang="ts">
import {type MenuItemView} from "@/shared/config";
import LocalizedLink from "@/shared/ui/navigation/LocalizedLink.vue";
import {MenuItem} from "@/shared/ui";
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
});
</script>

<template>
  <LocalizedLink :name="menuItemView.routeName!" :params="menuItemView.routeParams">
    <MenuItem :menu-item-view
              :icon-classes
              :label-classes/>
  </LocalizedLink>
</template>
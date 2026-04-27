<script setup lang="ts">
import {useNavigation} from "@/shared/lib/useNavigation.ts";
import SidebarToggle from "@/widgets/sidebar/ui/SidebarToggle.vue";
import Logo from "@/shared/ui/logo/Logo.vue";
import NavigationLink from "@/shared/ui/navigation/NavigationLink.vue";
import IconLabel from "@/shared/ui/IconLabel.vue";

defineProps<{
  isVisible: boolean;
}>();

const navigation = useNavigation().getSidebarNavigation();
</script>

<template>
<!--
  <Transition name="sidebar">
    <aside v-show="isVisible" class="flex flex-col w-sidebar h-sidebar border-r border-default bg-primary">
      <div class="flex items-center gap-1 w-full h-navbar px-sidebar border-b border-default">
        <SidebarToggle/>
        <NavigationLink to="/" class="block h-full min-w-0 max-w-full max-h-full">
          <Logo has-logotype logotype-classes="max-lg:hidden" class="shrink-0 py-2"/>
        </NavigationLink>
      </div>
      <div class="h-full overflow-auto px-sidebar">
        <section v-for="section in navigation" :key="section.id">
          <h3 v-text="section.heading" class="max-w-full my-heading truncate text-muted"/>
          <nav class="flex flex-col items-start gap-5 h-full mb-section">
            <NavigationLink v-for="navLink in section.navLinks" :key="navLink.id" :to="navLink.href"
                     class="grow-0 w-full font-semibold px-2 py-1.5
                                border rounded-xl border-transparent hover:border-default hover:bg-hover">
              <IconLabel class="max-w-full">
                <template #icon>
                  <component :is="navLink.icon" class="w-7.5"/>
                </template>
                <template #label>
                  <span v-text="navLink.label.value" class="truncate"/>
                </template>
              </IconLabel>
            </NavigationLink>
          </nav>
        </section>
      </div>
    </aside>
  </Transition>
  -->
</template>

<style scoped>
.sidebar-enter-from {
  opacity: 0;
  transform: translateX(-10px) scaleX(0);
}

.sidebar-enter-to {
  opacity: 1;
  transform: translateX(0px) scaleX(1);
}

.sidebar-enter-active {
  transition: opacity 200ms ease, transform 200ms ease;
  transform-origin: left;
}

.sidebar-leave-from {
  opacity: 1;
  transform: translateX(0) scaleX(1);
}

.sidebar-leave-to {
  opacity: 0;
  transform: translateX(0) scaleX(0);
}

.sidebar-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
  transform-origin: left;
}
</style>
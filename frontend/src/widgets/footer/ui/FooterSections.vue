<script setup lang="ts">
import FooterLinks from "@/widgets/footer/ui/FooterLinks.vue";
import type {NavigationSectionView} from "@/shared/config";

defineProps<{
  navigationSectionViews: NavigationSectionView[];
}>();

</script>

<template>
  <div class="footer-content w-full mb-15">
    <section v-for="navigationSectionView in navigationSectionViews"
             :key="navigationSectionView.id"
             class="flex flex-col justify-start items-start gap-4">
      <h3 v-text="navigationSectionView.label" class="font-semibold"/>
      <FooterLinks :navigation-section-view/>
    </section>
  </div>
</template>

<style scoped>
.footer-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-row-gap: 2rem;
}

@media (max-width: calc(48rem - 1px)) {
  .footer-content > :nth-child(2n + 1) {
    justify-self: start;
  }

  .footer-content > :nth-child(2n + 2) {
    justify-self: end;
  }
}

@media (min-width: 48rem) {
  .footer-content {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-row-gap: 3rem;
  }

  .footer-content > :nth-child(3n + 1) {
    justify-self: start;
  }

  .footer-content > :nth-child(3n + 2) {
    justify-self: center;
  }

  .footer-content > :nth-child(3n + 3) {
    justify-self: end;
  }
}
</style>
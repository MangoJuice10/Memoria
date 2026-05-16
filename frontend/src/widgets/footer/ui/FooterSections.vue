<script setup lang="ts">
import FooterLinks from "@/widgets/footer/ui/FooterLinks.vue";
import type {MenuSectionView, FooterItemId, FooterSectionId} from "@/shared/config";

defineProps<{
  menuSectionViews: MenuSectionView<FooterSectionId, FooterItemId>[];
}>();

</script>

<template>
  <div class="footer-content w-full mb-15">
    <section v-for="menuSectionView in menuSectionViews"
             :key="menuSectionView.id"
             class="flex flex-col justify-start items-start gap-4">
      <h3 v-text="menuSectionView.label" class="font-semibold"/>
      <FooterLinks :menu-section-view/>
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
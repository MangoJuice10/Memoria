<script setup lang="ts">
import {Logo} from "@/shared/ui";
</script>
<template>
  <div class="fixed inset-0 z-60
              bg-tertiary">
    <div class="background
                flex justify-center items-center
                h-full w-full">
      <div class="animate-[logotype-spin_2s_linear_infinite]">
        <Logo :is-animated="false"
              logomark-classes="w-110! h-110!"
              class="animate-[logotype-pulse_1.2s_ease-in-out_infinite]"/>
      </div>
    </div>
  </div>
</template>

<style>
:root[data-theme="light"] .background {
  background-image: url("@/assets/background/background.png");
}

:root[data-theme="dark"] .background {
  background-image: url("@/assets/background/backgroundInverse.png");
}

@keyframes logotype-pulse {
  0% {
    opacity: 1;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.75;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(0.9);
  }
}

@keyframes logotype-spin {
  to {
    transform: rotate(-360deg);
  }
}
</style>
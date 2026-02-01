<script setup lang="ts">
</script>

<template>
  <!--Wrapper div encapsulates classes that must not be overridden by the consumer
  For example, if the component needs to be positioned absolutely, passing the class "absolute"
  to it would override the "relative" class, resulting in layout falling apart-->
  <!--Using a button instead of a div allows to avoid writing the boilerplate code
  for keyboard events handling-->
  <button type="button" class="rounded-full border border-transparent
  hover:border-border hover:bg-hover
  focus-visible:bg-focus
    cursor-pointer">
    <span
        class="relative w-full aspect-square">
      <!--Absolute positioning allows to center the container, while also being able to
      define its size as a portion of the parent container, ensuring that the distance between
      the child container and the parent container scales at all times-->
      <span
          class="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
        <slot/>
      </span>
    </span>
  </button>
</template>
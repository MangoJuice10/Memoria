<template>
  <div @keydown.enter @keydown.space
       class="border rounded-full border-transparent
       hover:border-default hover:bg-hover cursor-pointer
        focus-visible:border-default focus-visible:bg-focus"
       role="button" tabindex="0">
    <div class="flex justify-center items-center p-[15%]">
      <slot/>
    </div>
  </div>
</template>
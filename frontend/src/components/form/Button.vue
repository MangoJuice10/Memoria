

<template>
  <button
      class="flex justify-center items-center px-2.5 py-1.25 border rounded-xl text-text-inverse
       border-border
       enabled:bg-secondary enabled:hover:bg-tertiary enabled:hover:text-text enabled:active:bg-primary enabled:active:text-text enabled:hover:scale-105 enabled:active:scale-110
       disabled:text-text-inactive disabled:bg-inactive disabled:cursor-not-allowed
       transition-all ease-in duartion-300">
    <slot/>
  </button>
</template>


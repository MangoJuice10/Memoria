<template>
  <button
      class="flex justify-center items-center p-button border border-default rounded-xl text-inverse font-semibold bg-secondary
       enabled:hover:bg-hover enabled:active:bg-primary hover:text-hover enabled:active:text-default enabled:hover:scale-105 enabled:active:scale-110
       disabled:text-disabled disabled:bg-disabled
       transition-all ease-in duartion-300">
    <slot/>
  </button>
</template>
<template>
  <button
    class="
      flex
      justify-center
      items-center
      p-4
      py-2
      border
      rounded
      font-bold
      transition
      text-center
      focus:ring-2 focus:ring-opacity-50 focus:outline-none
    "
    :class="[variant, fullWidth && 'w-full']"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    fullWidth: Boolean,
    variant: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang='postcss' scoped>
/* 各個按鈕樣式 */
.primary {
  @apply text-white border-primary-500 bg-primary-500 hover:bg-primary-700 focus:ring-primary-400;
}
.secondary {
  @apply text-white border-secondary-500 bg-secondary-500 hover:bg-secondary-700 focus:ring-secondary-400;
}
.outline-primary {
  @apply text-primary-500 border-primary-500 bg-white hover:text-white hover:bg-primary-500 focus:ring-primary-400;
}
.outline-secondary {
  @apply text-secondary-500 border-secondary-500 bg-white hover:text-white hover:bg-secondary-500 focus:ring-secondary-400;
}
.icon-success {
  @apply rounded-full border-none h-8 w-8 text-green-500 hover:bg-green-100 focus:ring-green-300;
}
.icon-error {
  @apply rounded-full border-none h-8 w-8 text-red-500 hover:bg-red-100 focus:ring-red-300;
}
</style>
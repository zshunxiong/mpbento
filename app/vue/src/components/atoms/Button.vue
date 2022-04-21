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
    :class="[sizes[size], classes[variant], fullWidth && 'w-full']"
  >
    <slot></slot>
  </button>
</template>

<script>
const classes = {
  primary:
    "text-white border-primary-500 bg-primary-500 hover:bg-primary-700 focus:ring-primary-400",
  secondary:
    "text-white border-secondary-500 bg-secondary-500 hover:bg-secondary-700 focus:ring-secondary-400",
  "outline-primary":
    "text-primary-500 border-primary-500 bg-white hover:text-white hover:bg-primary-500 focus:ring-primary-400",
  "outline-secondary":
    "text-secondary-500 border-secondary-500 bg-white hover:text-white hover:bg-secondary-500 focus:ring-secondary-400",
  "icon-success":
    "rounded-full border-none px-2 text-green-500 hover:bg-green-100 focus:ring-green-300",
  "icon-error":
    "rounded-full border-none px-2 text-red-500 hover:bg-red-100 focus:ring-red-300",
};

const sizes = {
  sm: "p-2 text-sm",
  md: "p-4 py-2",
  lg: "p-4 py-2 text-lg",
};

export default {
  name: "Button",
  props: {
    fullWidth: Boolean,
    variant: String,
    size: {
      type: String,
      default: "md",
    },
  },
  data: () => ({
    classes: classes,
    sizes: sizes,
  }),
};
</script>
<template>
  <a
    :href="href"
    :target="target"
    :class="[
      'text-primary-400 hover:text-primary-600',
      actived && 'text-primary-900 hover:text-primary-900 font-bold',
    ]"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "Link",
  props: {
    href: String,
    target: String,
    actived: Boolean,
  },
};
</script>
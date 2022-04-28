<template>
  <transition
    name="overlay"
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      class="h-screen w-screen fixed top-0 left-0 bg-opacity-50 flex justify-center items-center"
      :class="classes"
      v-if="show"
      @click="onClick"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Overlay",
  
  props: {
    show: Boolean,
    onClick: Function,
    classes: String,
  },
};
</script>
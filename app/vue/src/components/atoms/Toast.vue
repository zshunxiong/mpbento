<template>
  <div
    class="
      flex
      w-max
      max-w-full
      overflow-hidden
      bg-white
      rounded-lg
      shadow-md
      mb-2
    "
  >
    <div
      class="flex items-center justify-center w-12"
      :class="classes[variant].bg"
    >
      <svg
        class="w-6 h-6 text-white fill-current"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path :d="classes[variant].svg" />
      </svg>
    </div>

    <div class="px-4 py-2 -mx-3">
      <div class="mx-3 flex">
        <div>
          <span
            class="font-semibold capitalize"
            :class="classes[variant].text"
            >{{ title || variant }}</span
          >
          <p class="text-sm text-gray-500">{{ text }}</p>
        </div>
        <div v-if="action" class="ml-2 flex justify-center items-center">
          <Button
            @click="action"
            variant="icon-success"
            class="transition-colors"
          >
            <FontAwesomeIcon icon="check" />
          </Button>
          <Button
            @click="dismiss"
            variant="icon-error"
            class="transition-colors -mr-2"
            ><FontAwesomeIcon icon="times"
          /></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<script>
import Button from "./Button.vue";

const classes = {
  success: {
    bg: "bg-green-500",
    text: "text-green-500",
    svg: "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z",
  },
  info: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    svg: "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z",
  },
  warning: {
    bg: "bg-yellow-400",
    text: "text-yellow-400",
    svg: "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z",
  },
  error: {
    bg: "bg-red-500",
    text: "text-red-500",
    svg: "M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z",
  },
};

export default {
  name: "Toast",
  props: {
    variant: String,
    title: String,
    text: String,
    action: Function,
    dismiss: Function,
  },
  data: () => ({
    classes: classes,
  }),
  components: {
    Button,
  },
};
</script>
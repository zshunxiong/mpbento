<template>
  <div class="shadow-md rounded-md overflow-hidden bg-white">
    <div v-if="!isLoading">
      <img
        v-if="url"
        class="m-auto h-32"
        :src="loadedImg"
        :class="!loadedImg && 'animate-pulse bg-gray-300'"
        alt=""
      />
      <div class="p-4">
        <h5 v-if="title" class="text-lg font-semibold mb-2">{{ title }}</h5>
        <p v-if="text" class="mb-4 text-sm">{{ text }}</p>
        <Button
          v-if="action && actionText"
          variant="secondary"
          size="sm"
          @click="action"
        >
          {{ actionText }}
        </Button>
        <slot></slot>
      </div>
    </div>

    <!-- Skeleton card -->
    <div v-else class="animate-pulse">
      <div class="bg-gray-300 h-32"></div>
      <div class="p-4">
        <div class="bg-gray-300 h-4 w-1/3 mb-2"></div>
        <div class="bg-gray-300 h-2.5 w-2/3 mb-1"></div>
        <div class="bg-gray-300 h-2.5 w-2/3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "Card",
  components: {
    Button,
  },
  props: {
    url: String,
    title: String,
    text: String,
    action: Function,
    actionText: String,
    isLoading: Boolean,
  },
  data: () => ({
    loadedImg: null,
  }),
  mounted() {
    // Show skeleton before image loaded
    let image = new Image();
    image.src = this.url;
    image.onload = () => {
      this.loadedImg = image.src;
    };
    this.loadedImg = null;
  },
};
</script>
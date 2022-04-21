<template>
  <p class="mt-1 text-sm text-gray-500">
    <span class="block" v-for="(row, index) in data" :key="row + index">
      {{ row }}
    </span>
  </p>
</template>

<script>
export default {
  name: "HelperText",
  props: {
    text: [String, Array],
  },
  computed: {
    data() {
      if (typeof this.text === "string") return [this.text];
      else return this.text;
    },
  },
};
</script>
<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="radio"
      class="text-secondary-500 cursor-pointer focus:ring-secondary-300 focus:border-secondary-400"
      :name="name"
      :value="value"
      :checked="checked"
    />
    <span class="ml-2 text-gray-500">{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: "Link",
  props: {
    name: String,
    value: String,
    text: String,
    checked: Boolean,
  },
};
</script>
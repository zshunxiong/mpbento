<template>
  <div class="mb-2">
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <slot></slot>
    <HelperText v-if="helperText" :text="helperText" />
  </div>
</template>

<script>
import HelperText from "../atoms/HelperText.vue";

export default {
  name: "FormGroup",
  props: {
    label: String,
    helperText: [String, Array],
  },
  components: {
    HelperText,
  },
};
</script>
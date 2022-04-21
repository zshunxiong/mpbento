<template>
  <textarea
    :id="id"
    :name="name"
    :rows="rows"
    :placeholder="ph"
    :value="value"
    :readonly="readOnly"
    @input="$emit('update:value', $event.target.value)"
    class="
      p-2
      shadow-sm
      block
      w-full
      sm:text-sm
      border border-gray-300
      rounded-md
      focus:ring-indigo-300 focus:border-indigo-400`
    "
    :class="[
      readOnly && 'bg-gray-100'
    ]"
  ></textarea>
</template>

<script>
const randomID = Math.random().toString();

export default {
  name: "Textarea",
  props: {
    id: {
      type: String,
      default: randomID,
    },
    name: String,
    ph: String,
    rows: Number,
    value: String,
    readOnly: Boolean
  },
};
</script>
<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      fixed
      bottom-8
      max-w-95/100
      left-1/2
      -translate-x-1/2
    "
  >
    <transition-group
      name="toast"
      enter-active-class="duration-300"
      leave-active-class="duration-300"
      enter-from-class="-translate-x-8 opacity-0"
      leave-to-class="translate-x-8 opacity-0"
    >
      <Toast
        v-for="item in getToasts"
        :key="item.id"
        :variant="item.variant"
        :title="item.title"
        :text="item.text"
        :action="item.action"
        :dismiss="item.dismiss"
      />
    </transition-group>
  </div>
</template>

<script>
import Toast from "../atoms/Toast.vue";

export default {
  name: "ToastList",
  components: {
    Toast,
  },
  props: {
    array: Array,
  },
  computed: {
    getToasts() {
      return this.array.map((row) => ({
        ...row,
        variant: row.variant || "success",
      }));
    },
  },
};
</script>
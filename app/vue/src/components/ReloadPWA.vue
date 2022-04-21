<template>
  <div v-if="offlineReady || needRefresh" class="flex flex-wrap" role="alert">
    <div class="message mt-1">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else
        >New content available, click on reload button to update1.</span
      >
    </div>
    <div class="buttons flex align-middle mt-2 md:mt-0">
      <Button v-if="needRefresh" @click="updateServiceWorker()">
        Reload
      </Button>
      <Button @click="close">Close</Button>
    </div>
  </div>
</template>


<script setup>
import Button from "./atoms/Button.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>

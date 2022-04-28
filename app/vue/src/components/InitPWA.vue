<template>
  <div class="hidden"></div>
</template>

<script setup>
import Button from "./atoms/Button.vue";
import Overlay from "./atoms/Overlay.vue";
import store from "../store";
import { watch } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
const { needRefresh, updateServiceWorker } = useRegisterSW();

// 若有可進行的更新，彈出更新提示
watch(
  needRefresh,
  (value) => {
    if (value)
      store.dispatch("fireToast", {
        id: "pwaReloadMsg",
        title: "檢測到有可更新的版本",
        text: "請點擊確認以進行重整更新",
        variant: "info",
        action: updateServiceWorker,
        dismiss: () => store.commit("dismissToast", "pwaReloadMsg"),
      });
  },
  {
    immediate: true,
  }
);
</script>

<script>
export default {
  name: "InitPWA",

  data: () => ({
    // 自定義 PWA 安裝提示
    deferredPrompt: null,
  }),

  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },

  watch: {
    deferredPrompt: function () {
      if (this.deferredPrompt)
        this.$store.dispatch("fireToast", {
          id: "pwaInstallationMsg",
          title: "安裝網頁APP到設備上",
          text: "可加速網頁開啟, 並提供離線操作",
          variant: "info",
          action: () => {
            this.deferredPrompt.prompt();
            this.$store.commit("dismissToast", "pwaInstallationMsg");
          },
        });
    },
  },
};
</script>
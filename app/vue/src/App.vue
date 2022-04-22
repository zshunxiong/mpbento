<template>
  <!-- 必要時可暫時關閉 PWA 方便開發 -->
  <ReloadPWA />
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Tutorials Title</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
  <ToastList :array="toast" />
</template>

<script>
import ToastList from "./components/molecules/ToastList.vue";
import ReloadPWA from "./components/ReloadPWA.vue";
import store from "./store";

export default {
  name: "App",
  components: {
    ToastList,
    ReloadPWA,
  },
  computed: {
    toast: () => store.state.toast,
  },

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
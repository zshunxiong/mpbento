<template>
  <div class="container mx-auto my-4 w-11/12">
    <router-link
      v-for="(route, index) in routes"
      :key="route.name"
      :to="route.path"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <Link :actived="isActive" :href="href" @click="navigate">
        {{ route.text }}
      </Link>
      <span v-if="index !== routes.length - 1"> | </span>
    </router-link>
    <div class="my-4">
      <router-view />
    </div>
  </div>
  <ToastList :array="$store.state.toast" />
  <!-- 初始化 PWA，裡面會檢查是否需做對應彈窗 -->
  <InitPWA />
</template>

<script setup>
import Link from "./components/atoms/Link.vue";
import ToastList from "./components/molecules/ToastList.vue";
import InitPWA from "./components/InitPWA.vue";
import { routes } from "./router";
</script>
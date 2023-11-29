<template>
  <n-layout class="main-box-layout" has-sider>
    <n-layout-sider :width="200" bordered content-style="padding: 12px;">
      <n-menu v-model:value="activeKey" :options="menuOptions" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <iframe
        :src="`/javascript-guide/html/index${activeKey}.html`"
        frameborder="0"
        height="100%"
        scrolling="no"
        width="100%"
      ></iframe>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { MenuOption } from "naive-ui";

const activeKey = ref<string>("01");

const menuOptions: MenuOption[] = Array(24)
  .fill(0)
  .map((_, i) => {
    const key = (i + 1).toString().padStart(2, "0");
    return { label: `页面${key}`, key };
  });
</script>

<style scoped>
.main-box-layout {
  height: calc(100vh - var(--vp-nav-height) - 1px);
}
</style>

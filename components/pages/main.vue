<template>
  <n-layout class="main-box-layout" has-sider>
    <n-layout-sider :width="200" bordered content-style="padding: 12px;">
      <n-menu v-model:value="activeKey" :options="menuOptions" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <p>https://neumorphism.io/#ff0000</p>
      <p>https://hype4.academy/tools/glassmorphism-generator</p>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { MenuOption } from "naive-ui";

const activeKey = ref<string>("");

const menuOptions: MenuOption[] = [
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
  },
];
</script>

<style scoped>
.main-box-layout {
  height: calc(100vh - var(--vp-nav-height) - 1px);
}
</style>

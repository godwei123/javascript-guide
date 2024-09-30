<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { darkTheme, useNotification } from "naive-ui";
import { ref, watchEffect, inject, computed, watch } from "vue";
import { useData } from "vitepress";
import NotFound from "./not-found.vue";

const { isDark } = useData();
const theme = ref();
const message = inject("newVersion");

watchEffect(() => {
  theme.value = isDark.value ? darkTheme : null;
});

const refresh = () => {
  window.location.reload();
};
</script>

<template>
  <n-config-provider :theme="theme">
    <n-notification-provider>
      <n-message-provider>
        <n-loading-bar-provider>
          <DefaultTheme.Layout>
            <template #not-found>
              <not-found />
            </template>
          </DefaultTheme.Layout>
        </n-loading-bar-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
  <n-element v-if="message" class="fixed-element">
    <n-button size="small" text @click="refresh"> 页面有更新，请点击刷新</n-button>
  </n-element>
</template>

<style>
.fixed-element {
  position: fixed;
  z-index: 10;
  bottom: 40px;
  right: 40px;
  background-color: #e1e4e8;
  color: #232840;
  padding: 10px 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
</style>

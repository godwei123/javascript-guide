<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { darkTheme } from "naive-ui";
import { ref, watch } from "vue";
import { useData } from "vitepress";
import NotFound from "./not-found.vue";

const { isDark } = useData();
const theme = ref();

watch(isDark, (val) => {
  theme.value = val ? darkTheme : null;
});
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
</template>

<style></style>

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
const showWatermark = ref(false);
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
  <n-watermark
    v-show="showWatermark"
    content="javascript guide"
    cross
    fullscreen
    :font-size="20"
    :line-height="16"
    :width="384"
    :height="284"
    :x-offset="12"
    :y-offset="60"
    :rotate="-15"
    :z-index="99"
    :font-family="'IBM Plex Mono'"
  />
</template>

<style></style>

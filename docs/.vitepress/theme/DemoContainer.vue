<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, watchEffect, markRaw } from "vue";
import { useClipboard, useToggle } from "@vueuse/core";
import Example from "./demo/vp-example.vue";
import SourceCode from "./demo/vp-source-code.vue";
import { useMessage } from "naive-ui";

const props = defineProps<{
  demos?: object;
  source: string;
  path: string;
  rawSource: string;
  description?: string;
}>();

const vm = getCurrentInstance()!;

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
});

const [sourceVisible, toggleSourceVisible] = useToggle();

const sourceCodeRef = ref<HTMLButtonElement>();
const formatPathDemos = computed(() => {
  const demos = {};

  // Object.keys(props.demos).forEach((key) => {
  //   demos[key.replace("../../packages/", "").replace(".vue", "")] = props.demos[key].default;
  // });

  return demos;
});

const decodedDescription = computed(() => decodeURIComponent(props.description!));
const Cmp = ref();
onMounted(() => {
  import(`../../../packages/test/striped.vue`).then((module) => {
    Cmp.value = markRaw(module.default);
  });
});
const message = useMessage();
const copyCode = async () => {
  if (!isSupported) {
    message.error("copy error");
  }
  try {
    await copy();
  } catch (e: any) {
    message.error(e.message);
  }
};
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />

    <div class="example">
      <Example v-if="Cmp" :demo="Cmp" :file="path" />

      <n-divider class="m-0" />

      <div class="op-btns">
        <n-tooltip :show-arrow="false" trigger="hover">
          <template #trigger>
            <div
              aria-label="复制代码"
              class="op-btn"
              role="button"
              tabindex="0"
              @click="copyCode"
              @keydown.prevent.enter="copyCode"
              @keydown.prevent.space="copyCode"
            >
              复制代码
            </div>
          </template>
          复制代码
        </n-tooltip>
        <n-tooltip :show-arrow="false" trigger="hover">
          <template #trigger>
            <button
              ref="sourceCodeRef"
              class="reset-btn el-icon op-btn"
              @click="toggleSourceVisible()"
            >
              xx
            </button>
          </template>
          查看源码
        </n-tooltip>
      </div>

      <SourceCode v-show="sourceVisible" :source="source" />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>

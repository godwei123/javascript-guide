<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import CodeOpen from "../icons/code-open.vue";
import CodeClose from "../icons/code-close.vue";
import CodeCopy from "../icons/code-copy.vue";
import { useCodeFold } from "../hooks/use-codefold";
import { useCodeCopy } from "../hooks/use-codecopy";
import { useMessage } from "naive-ui";

interface DemoBlockProps {
  code: string;
  showCode: string;
  title: string;
  description: string;
  onlyRender?: boolean;
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: "默认标题",
  description: "描述内容",
  onlyRender: false,
});

const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

const sourceCode = ref(decodeURIComponent(props.code));
const showSourceCode = ref(decodeURIComponent(props.showCode));
const sourceCodeArea = ref<any>(null);
const message = useMessage();

const clickCodeCopy = () => {
  clickCopy(sourceCode.value);
  message.success("复制成功");
};

const sourceCodeContainerHeight = computed(() => {
  if (sourceCodeArea.value) return sourceCodeArea.value?.clientHeight;
  return 0;
});
const setContainerHeight = (value: number) => {
  if (isCodeFold.value) sourceCodeArea.value.style.height = "0px";
  else sourceCodeArea.value.style.height = `${value}px`;
};
onMounted(() => {
  // 组件挂载时，先获取代码块容器为折叠前的容器高度
  if (props.onlyRender) return;
  const currentContainerHeight = sourceCodeContainerHeight.value;
  setContainerHeight(currentContainerHeight);
});
watch(isCodeFold, () => {
  const container = sourceCodeContainerHeight.value;
  setContainerHeight(container);
});
</script>

<template>
  <ClientOnly>
    <div class="vitepress-demo-preview__custom-ui__container">
      <section v-if="!onlyRender || props.title" class="vitepress-demo-preview-name_handle">
        <div v-if="props.title" class="vitepress-demo-preview-component__name">{{ title }}</div>
        <div v-if="!onlyRender" class="vitepress-demo-preview-description__btns">
          <CodeCopy @click="clickCodeCopy" />
          <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
          <CodeOpen v-else @click="setCodeFold(false)" />
        </div>
      </section>

      <section v-if="props.description" class="vitepress-demo-preview-description">
        <span>
          {{ description }}
        </span>
      </section>

      <section class="vitepress-demo-preview-preview">
        <slot></slot>
      </section>

      <section v-if="!onlyRender" ref="sourceCodeArea" class="vitepress-demo-preview-source">
        <n-divider />
        <div class="language-vue" v-html="showSourceCode"></div>
      </section>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
:root {
  --component-preview-bg: var(--vp-c-bg);
  --component-preview-soft: var(--vp-c-bg-soft);
  --component-preview-mute: var(--vp-c-bg-mute);
  --component-preview-border: rgb(240, 240, 240);
  --component-preview-text-1: var(--vp-c-text-1);
  --component-preview-text-2: var(--vp-c-text-2);
  --component-preview-text-3: var(--vp-c-text-3);
  --component-preview-text-4: var(--vp-c-text-4);
  --component-preview-code-block-bg: #343030;
  --component-preview-primary-color: var(--vp-c-brand);
}

.dark:root {
  --component-preview-bg: var(--vp-c-bg);
  --component-preview-soft: var(--vp-c-bg-soft);
  --component-preview-mute: var(--vp-c-bg-mute);
  --component-preview-border: rgb(240, 240, 240, 0.1);
  --component-preview-text-1: var(--vp-c-text-1);
  --component-preview-text-2: var(--vp-c-text-2);
  --component-preview-text-3: var(--vp-c-text-3);
  --component-preview-text-4: var(--vp-c-text-4);
  --component-preview-code-block-bg: #282626;
  --component-preview-primary-color: var(--vp-c-brand);
}

$defaultPrefix: "vitepress-demo-preview";

$componentPrefix: "custom-ui";
$containerPrefix: #{$defaultPrefix}__#{$componentPrefix};

.#{$containerPrefix}__container > * {
  font-size: 14px;
}

.#{$containerPrefix}__container {
  div[class*="language-"] {
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    background-color: var(--component-preview-bg);
  }
}

.#{$containerPrefix}__container {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--component-preview-border);
  box-shadow: 0px 0px 10px var(--component-preview-border);
  margin: 10px 0;
  overflow: hidden;

  .#{$defaultPrefix}-name_handle,
  .#{$defaultPrefix}-description,
  .#{$defaultPrefix}-source {
    width: 100%;
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-name_handle {
  padding: 20px 20px 20px 20px;
  display: flex;
  align-items: center;

  & > .#{$defaultPrefix}-component__name {
    font-size: 20px;
  }

  & > .#{$defaultPrefix}-description__btns {
    display: flex;
    align-items: center;
    margin-left: auto;

    svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      color: var(--component-preview-text-1);
      cursor: pointer;
    }

    svg:not(:last-of-type) {
      margin-right: 8px;
    }
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-description {
  padding: 5px 20px 5px 20px;
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-preview {
  padding: 10px 10px 10px 20px;

  & > p {
    margin: 0;
    padding: 0;
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-source {
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
</style>

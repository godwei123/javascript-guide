<template>
  <div class="vitepress-demo-preview__custom-ui__container">
    <section v-if="props.description" class="vitepress-demo-preview-description">
      <span>
        {{ description }}
      </span>
    </section>
    <section class="vitepress-demo-preview-preview">
      <slot></slot>
    </section>

    <section v-if="!onlyRender || props.title" class="vitepress-demo-preview-name_handle">
      <div v-if="props.title" class="vitepress-demo-preview-component__name">{{ title }}</div>
      <div v-if="!onlyRender" class="vitepress-demo-preview-description__btns">
        <CodeCopy @click="clickCodeCopy" />
        <CodeClose v-if="!isCodeFold" @click="isCodeFold = true" />
        <CodeOpen v-else @click="isCodeFold = false" />
      </div>
    </section>
    <section v-if="!onlyRender" ref="sourceCodeArea" class="vitepress-demo-preview-source">
      <div class="language-vue" v-html="showSourceCode"></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import CodeOpen from "./icons/code-open.vue";
import CodeClose from "./icons/code-close.vue";
import CodeCopy from "./icons/code-copy.vue";
import { useCodeCopy } from "./use-codecopy";
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

const isCodeFold = ref(true);
const { clickCopy } = useCodeCopy();

const sourceCode = ref(decodeURIComponent(props.code));
const showSourceCode = ref(decodeURIComponent(props.showCode));
const sourceCodeArea = ref();
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
  if (isCodeFold.value) {
    sourceCodeArea.value.style.height = "0px";
  } else sourceCodeArea.value.style.height = `${value}px`;
};
onMounted(() => {
  // 组件挂载时，先获取代码块容器为折叠前的容器高度
  if (props.onlyRender) return;
  const currentContainerHeight = sourceCodeContainerHeight.value;
  nextTick(() => {
    setContainerHeight(currentContainerHeight);
  });
});
watch(isCodeFold, () => {
  const container = sourceCodeContainerHeight.value;
  setContainerHeight(container);
});
</script>

<style lang="scss" scoped>
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
  }
}

.#{$containerPrefix}__container {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--component-preview-border);
  margin: 10px 0;
  overflow: hidden;

  .#{$defaultPrefix}-name_handle,
  .#{$defaultPrefix}-description,
  .#{$defaultPrefix}-source {
    width: 100%;
  }
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-name_handle {
  padding: 10px;
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
  padding: 5px 10px;
}

.#{$containerPrefix}__container > .#{$defaultPrefix}-preview {
  padding: 0 10px;

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

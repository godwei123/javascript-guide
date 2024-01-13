<script setup lang="ts">
import { useRouter } from "vitepress";

const router = useRouter();
const goBack = () => {
  router.go("/javascript-guide/");
};
</script>

<template>
  <div style="position: absolute; top: 50%; left: 50%; translate: -50% -50%">
    <n-result description="生活总归带点荒谬" size="huge" status="404" title="404 资源不存在">
      <template #footer>
        <n-button @click="goBack">回到首页</n-button>
      </template>
    </n-result>
  </div>
</template>

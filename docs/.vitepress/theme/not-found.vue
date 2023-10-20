<script setup lang="ts">
import { useRouter } from "vitepress";

const router = useRouter();
const goBack = () => {
  router.go("/");
};
</script>

<template>
  <div style="position: absolute; top: 50%; left: 50%; translate: -50% -50%">
    <n-result
      status="404"
      title="404 资源不存在"
      size="huge"
      description="生活总归带点荒谬"
    >
      <template #footer>
        <n-button @click="goBack">回到首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped></style>

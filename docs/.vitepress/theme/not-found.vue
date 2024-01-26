<!--<script setup lang="ts">-->
<!--import { useRouter } from "vitepress";-->

<!--const router = useRouter();-->
<!--const goBack = () => {-->
<!--  router.go("/javascript-guide/");-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div style="position: absolute; top: 50%; left: 50%; translate: -50% -50%">-->
<!--    <n-result description="生活总归带点荒谬" size="huge" status="404" title="404 资源不存在">-->
<!--      <template #footer>-->
<!--        <n-button @click="goBack">回到首页</n-button>-->
<!--      </template>-->
<!--    </n-result>-->
<!--  </div>-->
<!--</template>-->

<script setup lang="ts">
import lottie from "lottie-web";
import { onMounted } from "vue";

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("lottie"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://lottie.host/770671d5-4cd7-4434-9d35-4ac4928cd6ca/puQNRLw0W3.json",
  });
});

import { useRouter } from "vitepress";

const router = useRouter();
const goBack = () => {
  router.go("/javascript-guide/");
};
</script>

<template>
  <div id="lottie" @click="goBack"></div>
</template>

<style scoped>
#lottie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>

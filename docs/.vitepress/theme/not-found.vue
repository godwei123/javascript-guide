<script setup lang="ts">
import lottie from "lottie-web";
import { onMounted, ref } from "vue";
import { useRouter } from "vitepress";
import animationData from "./animation-404.json";
import { baseURL } from "../project.config";

const router = useRouter();
const lottieRef = ref<HTMLElement | null>(null);
onMounted(() => {
  lottie.loadAnimation({
    container: lottieRef.value as HTMLElement,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: animationData,
  });
});

const goBack = () => {
  router.go(baseURL);
};
</script>

<template>
  <div ref="lottieRef" @click="goBack"></div>
</template>

<style lang="scss" scoped>
#lottie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>

<script setup lang="ts">
import lottie from "lottie-web";
import { onMounted } from "vue";
import { useRouter } from "vitepress";
import animationData from "./animation-404.json";
import { baseURL } from "../project.config";

const router = useRouter();

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("lottie"),
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
  <div id="lottie" @click="goBack"></div>
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

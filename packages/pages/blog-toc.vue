<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, withBase } from "vitepress";

const router = useRouter();
const list = ref([]);

const getBlogPages = async () => {
  const files = import.meta.glob("../../docs/blog/*.md", { eager: true });
  for (const key in files) {
    const name = key.replace("../../docs/blog/", "").replace(".md", "");
    if (name === "introduction") continue;
    list.value.push({ name, link: withBase(`/blog/${name}.html`) });
  }
};

getBlogPages();
</script>

<template>
  <n-list clickable hoverable>
    <n-list-item v-for="item in list" :key="item" class="n-list-item" @click="router.go(item.link)">
      <n-flex justify="space-between">
        <span>{{ item.name }}</span>
      </n-flex>
    </n-list-item>
  </n-list>
</template>

<style scoped>
.n-list-item {
  cursor: pointer;
}
</style>

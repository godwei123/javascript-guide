<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, withBase } from "vitepress";

const router = useRouter();
const list = ref([]);

const getBlogPages = async () => {
  // @ts-ignore
  const files = import.meta.glob("../../docs/blog/*.md", { eager: true });
  for (const key in files) {
    const module = files[key];
    const { title, frontmatter, description, filePath } = module.__pageData;
    const { create = "" } = frontmatter;
    if (!title) continue;
    list.value.push({ title, link: withBase(`/${filePath.replace(".md", "")}`), description });
  }
};

getBlogPages();
</script>

<template>
  <n-list class="w-100 list-box" clickable hoverable>
    <n-list-item v-for="item in list" :key="item" class="n-list-item" @click="router.go(item.link)">
      <n-flex :wrap="false">
        <div class="icon">
          <img src="../assets/Theme=Flat-2.svg" />
        </div>
        <div class="w-100 flex-title">
          <div class="title w-100">{{ item.title }}</div>
          <n-ellipsis :line-clamp="1" :tooltip="false" class="w-100">
            {{ item.description }}
          </n-ellipsis>
        </div>
      </n-flex>
    </n-list-item>
  </n-list>
</template>

<style lang="scss" scoped>
.n-list-item {
  cursor: pointer;
  width: 100%;
  overflow: hidden;

  :deep(.n-list-item__main) {
    width: 100%;
  }
}

.w-100 {
  width: 100%;
  overflow: hidden;
}

.list-box {
  padding-left: 0px;
}

.icon {
  width: 60px;
  height: 60px;
  padding: 5px;
  background: #e0e5f4;
  border-radius: 10px;
  flex-shrink: 0;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
}

.flex-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

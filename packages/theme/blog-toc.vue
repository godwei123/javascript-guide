<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, withBase } from "vitepress";
import dayjs from "dayjs";

const router = useRouter();
const list = ref([]);
const resultList = ref([]);
const getBlogPages = async () => {
  // @ts-ignore
  const files = import.meta.glob("../../docs/blog/*.md", { eager: true });
  for (const key in files) {
    const module = files[key];
    const { title, frontmatter = {}, description, filePath } = module.__pageData;
    const { create_time = 0 } = frontmatter;
    if (!title) continue;
    list.value.push({
      title,
      link: withBase(`/${filePath.replace(".md", "")}`),
      description,
      create_time: create_time,
    });
  }
  console.log(list.value);
  list.value.sort((a, b) => {
    return dayjs(b.create_time).unix() - dayjs(a.create_time).unix();
  });
  console.log(list.value);
  resultList.value = list.value;
};

getBlogPages();
</script>

<template>
  <n-grid
    :x-gap="20"
    :y-gap="10"
    class="w-100 list-box item-container"
    cols="2"
    responsive="screen"
  >
    <n-grid-item
      v-for="(item, index) in list"
      :key="item"
      class="n-list-item"
      @click="router.go(item.link)"
    >
      <div class="title w-100">{{ index + 1 }}、{{ item.title }}</div>
    </n-grid-item>
  </n-grid>
</template>

<style lang="scss" scoped>
.n-list-item {
  cursor: pointer;
  padding: 20px;
  border: 1px solid #e0e5f4;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);

  :deep(.n-list-item__main) {
    width: 100%;
  }

  transition: linear 0.1s all;

  &:hover {
    background: #f5f7fa;
    scale: 1.01;
    transition: linear 0.2s all;

    .flex-container {
      gap: 8px 24px;
      transition: linear 0.2s all;
    }
  }
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px 12px;
}

.item-container {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.w-100 {
  width: 100%;
}

.list-box {
  padding-left: 0;
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

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, withBase } from "vitepress";

const router = useRouter();
const list = ref([]);
const list2 = ref([]);
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const getBlogPages = async () => {
  // @ts-ignore
  const files = import.meta.glob("../../docs/blog/*.md", { eager: true });
  for (const key in files) {
    const module = files[key];
    const { title, frontmatter = {}, description, filePath } = module.__pageData;
    const { timestamp = 0 } = frontmatter;
    if (!title) continue;
    const r = random(1, 13);
    list.value.push({
      title,
      link: withBase(`/${filePath.replace(".md", "")}`),
      description,
      random: r,
      timestamp: timestamp === 0 ? 0 : new Date(timestamp).getTime(),
    });
  }
  list.value.sort((a, b) => b.timestamp - a.timestamp);
  list2.value = list.value;
};

const handleSearch = (value: string) => {
  if (!value) return (list.value = list2.value);
  list.value = list2.value.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
};

getBlogPages();
</script>

<template>
  <n-input placeholder="搜索" round size="large" @update:value="handleSearch"></n-input>
  <n-grid
    :x-gap="20"
    :y-gap="20"
    class="w-100 list-box item-container"
    cols="1 s:1 m:2 l:2 xl:2 2xl:2"
    responsive="screen"
  >
    <n-grid-item v-for="item in list" :key="item" class="n-list-item" @click="router.go(item.link)">
      <div class="flex-container">
        <div class="icon">
          <img :src="withBase(`/Theme=Flat-${item.random}.svg`)" />
        </div>
        <div class="w-100 flex-title">
          <div class="title w-100">{{ item.title }}</div>
          <n-ellipsis :line-clamp="1" :tooltip="false" class="w-100">
            {{ item.description }}
          </n-ellipsis>
        </div>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style lang="scss" scoped>
.n-list-item {
  cursor: pointer;
  width: calc(50% - 10px);
  min-width: 500px;
  padding: 10px;
  border: 1px solid #e0e5f4;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);

  :deep(.n-list-item__main) {
    width: 100%;
  }

  transition: linear 0.1s all;

  &:hover {
    background: #f5f7fa;
    scale: 1.02;
    transition: linear 0.2s all;

    img {
      transform: scale(2);
      transition: linear 0.2s all;
    }

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

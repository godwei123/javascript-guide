<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  attachments: Array<{
    title: string;
    url: string;
    type: string;
    desc: string;
  }>;
}>();
</script>

<template>
  <div class="attachment">
    <n-grid :cols="4" x-gap="12">
      <n-gi v-for="item in attachments">
        <n-card>
          <n-card-header>
            <n-card-header-title>{{ item.title }}</n-card-header-title>
          </n-card-header>
          <n-card-content>
            <n-button block type="primary">
              <a :href="item.url" target="_blank">{{ item.type }}</a>
            </n-button>
          </n-card-content>
        </n-card>
        <div class="flex flex-nowrap">
          <div class="type-icon"></div>
          <div class="content">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
          <div class="download">
            <n-button block type="primary">
              <a :href="item.url" target="_blank">下载</a>
            </n-button>
          </div>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

.flex-nowrap {
  flex-wrap: nowrap;
}

.type-icon {
  width: 20px;
  background-color: #f00;
}

.content {
  flex: 1;
}

.download {
  width: 20px;
  background-color: #00f;
}
</style>

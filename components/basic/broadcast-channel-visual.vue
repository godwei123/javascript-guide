<template>
  <div class="components-container">
    <n-text>{{ list }}</n-text>
    <n-input-group>
      <n-input v-model:value="text" placeholder="请输入" />
      <n-button ghost type="primary" @click="sendText"> 发送</n-button>
    </n-input-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const text = ref("");
const list = ref<string[]>([]);
const result = ref([]);

const bc = new BroadcastChannel("test_channel");
bc.onmessage = function (event) {
  list.value = JSON.parse(event.data);
};

bc.onmessageerror = function (error) {
  console.log(error);
};
bc.postMessage(JSON.stringify(list.value));
const sendText = () => {
  if (text.value) {
    list.value.push(text.value);
    bc.postMessage(JSON.stringify(list.value));
  }
};
</script>

<style scoped></style>

<template>
  <div>
    <n-select v-model:value="value" :options="options" />
    <div
      style="
        height: 300px;
        display: flex;
        align-items: center;
        margin: 20px auto;
        justify-content: center;
      "
    >
      <div :class="['box', value]">文本</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const options = ref([
  { label: "above", value: "above" },
  { label: "below", value: "below" },
  { label: "left", value: "left" },
  { label: "right", value: "right" },
]);
const value = ref("above");
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #f00;
}

.above {
  -webkit-box-reflect: above 10px;
}

.below {
  -webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
}

.left {
  -webkit-box-reflect: left 10px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
}

.right {
  -webkit-box-reflect: right 10px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
}
</style>

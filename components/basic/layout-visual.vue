<template>
  <div class="components-container layout-visual">
    <div :style="boxStyle" class="box">
      <div :style="leftStyle" class="left">left</div>
      <div :style="rightStyle" class="right">right</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  boxStyle: Record<string, any>;
  leftStyle: Record<string, any>;
  rightStyle: Record<string, any>;
}>();
</script>

<style scoped>
.box {
  height: 300px;
  width: 100%;
  background-color: #e0f4ff;
  padding: 20px;
  box-sizing: border-box;
}

.left {
  background: #4e7bea;
}

.right {
  background: #43f848;
}
</style>

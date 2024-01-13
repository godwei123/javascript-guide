<template>
  <div class="components-container layout-visual">
    <div v-if="type === '1'" :style="boxStyle" class="box">
      <div :style="leftStyle" class="left">left</div>
      <div :style="rightStyle" class="right">right</div>
    </div>
    <div v-if="type === '2'" :style="boxStyle" class="box">
      <div :style="topStyle" class="top">header</div>
      <div :style="middleStyle" class="middle">container</div>
      <div :style="bottomStyle" class="bottom">footer</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    boxStyle: Record<string, any>;
    leftStyle: Record<string, any>;
    rightStyle: Record<string, any>;
    topStyle: Record<string, any>;
    middleStyle: Record<string, any>;
    bottomStyle: Record<string, any>;
    type: string;
  }>(),
  {
    type: "1",
  }
);
</script>

<style scoped>
.box {
  height: 300px;
  width: 100%;
  background-color: #e0f4ff;
  padding: 20px;
  box-sizing: border-box;
}

.left,
.top {
  background: #4e7bea;
}

.right,
.bottom {
  background: #43f848;
}

.middle {
  background: #8dadff;
}
</style>

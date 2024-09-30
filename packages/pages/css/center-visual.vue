<template>
  <div class="components-container center-visual">
    <div :style="parentStyle" class="parent">
      <div :style="childStyle" class="child"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  parentStyle?: Record<string, any>;
  childStyle?: Record<string, any>;
}>();
</script>

<style scoped>
.parent {
  width: 100%;
  height: 200px;
  background: #e0f4ff;
  border-radius: 10px;
}

.child {
  width: 100px;
  height: 100px;
  background: #4e7bea;
  border-radius: 5px;
}
</style>

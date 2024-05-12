<script setup lang="ts">
import { ref } from "vue";
import { blendModeLists } from "../../common/shapeConfig";

const value = ref("normal");
const bgValue = ref("#ccc");
const color1 = ref("rgb(255,0,0)");
const color2 = ref("rgb(0,255,0)");
const description = ref();
const handleChange = (val, option) => {
  description.value = option;
};
</script>

<template>
  <div class="components-container">
    <n-form>
      <n-grid :cols="24" :x-gap="12">
        <n-form-item-gi :span="12" label="背景色">
          <n-color-picker v-model:value="bgValue" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="mixBlendMode">
          <n-select v-model:value="value" :options="blendModeLists" @update:value="handleChange" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="color1">
          <n-color-picker v-model:value="color1" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="color2">
          <n-color-picker v-model:value="color2" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <div class="visual-box" :style="{ background: bgValue }">
      <div :style="{ mixBlendMode: value, background: color1 }" class="item one">1</div>
      <div :style="{ mixBlendMode: value, background: color2 }" class="item two">2</div>
    </div>
    <p>
      {{ description?.description }}
    </p>
  </div>
</template>

<style scoped>
.visual-box {
  min-height: 300px;
  border: 1px solid #b4e300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  color: black;
  font-size: 4rem;
  line-height: 150px;
  text-align: center;
}

.one {
  translate: 45px 0;
}

.two {
  translate: -45px 0;
}
</style>

<template>
  <n-grid x-gap="24" :cols="3">
    <n-gi>
      <n-color-picker v-model:value="color" />
    </n-gi>
    <n-gi :span="2">
      <div>name: {{ colorList.name }}</div>
      <div>hex: {{ colorList.hex }}</div>
      <div>hex8: {{ colorList.hex8 }}</div>
      <div>rgb: {{ colorList.rgb }}</div>
      <div>hsl: {{ colorList.hsl }}</div>
      <div>hsv: {{ colorList.hsv }}</div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import tinycolor from "tinycolor2";

const color = ref("#ff0000");

function color_detail(color) {
  return {
    hex: color.toHexString(),
    hex8: color.toHex8String(),
    rgb: color.toRgbString(),
    hsl: color.toHslString(),
    hsv: color.toHsvString(),
    name: color.toName() || "none",
    format: color.getFormat(),
    lighten: color.lighten(20).toHexString(),
    darken: color.darken(20).toHexString(),
    saturate: color.saturate(20).toHexString(),
    desaturate: color.desaturate(20).toHexString(),
    greyscale: color.greyscale().toHexString(),
    brighten: color.brighten(20).toHexString(),
    triad: color.triad().map((c) => c.toHexString()),
    tetrad: color.tetrad().map((c) => c.toHexString()),
    monochromatic: color.monochromatic().map((c) => c.toHexString()),
    analogous: color.analogous().map((c) => c.toHexString()),
    splitcomplement: color.splitcomplement().map((c) => c.toHexString()),
  };
}

const colorList = computed(() => {
  return color_detail(tinycolor(color.value));
});
</script>

<style scoped></style>

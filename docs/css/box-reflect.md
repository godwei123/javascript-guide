# box-reflect

-webkit-box-reflect CSS 属性可让你将元素内容在特定方向上进行轴对称反射。

语法：

```
box-reflect: <direction> <offset> <mask-box-image>;
```

- `<direction>`：指定反射的方向，可以是 `above`、`below`、`left` 或 `right`。
- `<offset>`：指定反射的偏移量，可以是长度值或百分比。
- `<mask-box-image>`：指定反射的遮罩图片。

示例：

```vue:demo
<template>
<div>
  <n-select v-model:value="value" :options="options" />
  <div style="height:400px;display:flex;align-items:center;margin: 20px auto;justify-content: center;">
    <div :class="['box',value]">The number is</div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const options= ref([
    { label: 'above', value: 'above' },
    { label: 'below', value: 'below' },
    { label: 'left', value: 'left' },
    { label: 'right', value: 'right' },
])
const value = ref('above')
</script>

<style scoped>
.box {
    width: 100px;
    height: 100px;
    background-color: #f00;
}
.above {
    -webkit-box-reflect: above 10px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
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

```

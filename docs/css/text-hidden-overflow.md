# text-hidden-overflow

:::tip
文字在一行显示，超出部分加省略号

文字在 n 行显示，超出部分加省略号
:::

```css
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.text-ellipsis-n {
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2; /* 行数 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
```

## 示例

:::preview
demo-preview=../../packages/pages/basic/text-overflow-visual.vue
onlyRender=false
:::

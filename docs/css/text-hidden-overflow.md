# text-hidden-overflow

## 文字在一行显示，超出部分加省略号

:::preview
demo-preview=../../packages/pages/basic/text-overflow-visual.vue
onlyRender=false
:::

```css
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

## 文字在 n 行显示，超出部分加省略号

<ClientOnly>
<textOverflowVisual className="text-ellipsis-n"/>
</ClientOnly>

```css
.text-ellipsis-n {
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2; /* 行数 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
```

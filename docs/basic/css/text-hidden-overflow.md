# text-hidden-overflow

<script setup>
import textOverflowVisual from '../../../components/basic/text-overflow-visual.vue'
</script>

## 文字在一行显示，超出部分加省略号

<textOverflowVisual className="text-ellipsis"/>

```css
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

## 文字在 n 行显示，超出部分加省略号

<textOverflowVisual className="text-ellipsis-n"/>

```css
.text-ellipsis-n {
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
```

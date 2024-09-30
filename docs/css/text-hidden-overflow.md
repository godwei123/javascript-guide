# 文本溢出

## 文字在一行显示，超出部分加省略号

```css
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

<div :class="$style.ellipsis">
前端开发是 Web应用程序开发的重要组成部分，它关注用户界面的可用性、外观和性能，与后端开发共同构建完整的 Web应用程序。前端开发不断演进，以适应新的技术和用户需求，因此前端开发人员通常需要不断学习和更新他们的技能。
</div>

## 文字在 n 行显示，超出部分加省略号

<div :class="$style.ellipsisN">
前端开发是 Web应用程序开发的重要组成部分，它关注用户界面的可用性、外观和性能，与后端开发共同构建完整的 Web应用程序。前端开发不断演进，以适应新的技术和用户需求，因此前端开发人员通常需要不断学习和更新他们的技能。前端开发是Web 应用程序开发的重要组成部分，它关注用户界面的可用性、外观和性能，与后端开发共同构建完整的 Web应用程序。前端开发不断演进，以适应新的技术和用户需求，因此前端开发人员通常需要不断学习和更新他们的技能。
</div>

```css
.text-ellipsis-n {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

<style module>
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ellipsisN {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

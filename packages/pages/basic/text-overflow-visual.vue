<script lang="ts" setup></script>

<template>
  <h4>文字在一行显示，超出部分加省略号</h4>

  <div class="text-ellipsis">
    前端开发是 Web
    应用程序开发的重要组成部分，它关注用户界面的可用性、外观和性能，与后端开发共同构建完整的 Web
    应用程序。前端开发不断演进，以适应新的技术和用户需求，因此前端开发人员通常需要不断学习和更新他们的技能。
  </div>
  <br />
  <h4>文字在 2 行显示，超出部分加省略号</h4>
  <div class="text-ellipsis-n">
    前端开发是 Web
    应用程序开发的重要组成部分，它关注用户界面的可用性、外观和性能，与后端开发共同构建完整的 Web
    应用程序。前端开发不断演进，以适应新的技术和用户需求，因此前端开发人员通常需要不断学习和更新他们的技能。前端开发是
    Web 应用程序开发的重要组成部分，它关注用户界面的可用性、外观和性能，与后端开发共同构建完整的 Web
    应用程序。前端开发不断演进，以适应新的技术和用户需求，因此前端开发人员通常需要不断学习和更新他们的技能。
  </div>
</template>

<style scoped>
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.text-ellipsis-n {
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
</style>

<template>
  <n-grid :cols="2" x-gap="20" y-gap="20">
    <n-gi>
      <div class="attachment-item">
        <div class="attachment-type">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
        </div>
        <p>title</p>
      </div>
    </n-gi>
    <n-gi>
      <div class="attachment-item">
        <div class="attachment-type"></div>
        <p>title</p>
      </div>
    </n-gi>
    <n-gi>
      <div class="attachment-item">
        <div class="attachment-type"></div>
        <p>title</p>
      </div>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
const props = defineProps<{
  attachments: Object[];
}>();

const previewImage = (url: string) => {
  window.open(url);
};

const downloadFile = (url: string) => {
  window.open(url, "_blank").focus();
};
//预览附件

const previewAttachment = (attachment: any) => {
  if (attachment.type === "image") {
    previewImage(attachment.url);
  } else {
    downloadFile(attachment.url);
  }
};
</script>

<style scoped>
.attachment-item {
  padding: 10px;
  display: flex;
  align-items: center;
  height: 70px;
  background-color: rgba(0, 128, 0, 0.12);
  border-radius: 0.5rem;
  gap: 20px;
  cursor: pointer;
}

.attachment-type {
  height: 100%;
  display: flex;
}
</style>

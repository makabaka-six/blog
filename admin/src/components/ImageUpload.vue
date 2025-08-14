
<template>
  <el-upload class="image-uploader" action="/api/upload" :show-file-list="false" :on-success="handleSuccess" :before-upload="onBeforeUpload">
    <img class="image" v-if="imageUrl" :src="imageUrl" />
    <el-icon v-else class="iconfont icon-upload image-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Notify from "@/utils/notify";

const imageUrl = defineModel<string>();

async function onBeforeUpload(file: File) {
  if (file.size > 1024 * 1024 * 5) {
    Notify.showMessage("文件大小不能超过5MB", "error");
    return false;
  }
  return true;
}

function handleSuccess(response: any) {
  if (response.code === 200) {
    imageUrl.value = response.data.url;
    console.log("图片上传成功:", response.data.url);
    Notify.showMessage("图片上传成功", "success");
  } else {
    Notify.showMessage("图片上传失败", "error");
  }
}
</script>

<style lang="scss">
.image-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

  .image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}

.image-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>

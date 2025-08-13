<template>
  <el-page-header @back="handleBack">
    <template #content>
      <span> 创建博客 </span>
    </template>

    <el-input class="title-input" placeholder="请输入博客标题"></el-input>
    <MdEditor v-model="text" previewTheme="vuepress" @save="handleSave" @onUploadImg="onUploadImg" />
  </el-page-header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import API from "@/apis";
import router from "@/router";

const text = ref<string>("");

function handleSave() {
  // Handle save logic here
  console.log("Content saved:", text.value);
}

const onUploadImg = async (files: File[], callback: Function) => {
  const res = await Promise.all(
    files.map(file => {
      return new Promise(async (rev, rej) => {
        const form = new FormData();
        form.append("image", file);
        API.uploadImage(form)
          .then(res => rev(res))
          .catch(error => rej(error));
      });
    })
  );
  callback(res.map((item: any) => item.data.url));
};

function handleBack() {
  router.back();
}
</script>

<style lang="scss">
.title-input {
  width: calc(100% - 10px);
  border-bottom: 1px solid #ddd;
  margin: 10px 5px;

  .el-input__wrapper {
    box-shadow: none;
  }
}

.md-editor {
  border: none;
  height: calc(100vh - 195px);
}
</style>

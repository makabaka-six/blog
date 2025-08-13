<template>
  <el-page-header @back="router.back()">
    <template #content>
      <span> 博客管理 </span>
    </template>

    <div class="search-bar">
      <div class="left-section">
        <div class="item">
          <el-text>标题</el-text>
          <el-input placeholder="请输入标题" style="width: 200px; margin-right: 10px"></el-input>
        </div>
        <div class="item">
          <el-text>状态</el-text>
          <el-select placeholder="请选择分类" style="width: 200px; margin-right: 10px">
            <el-option label="分类1" value="1"></el-option>
            <el-option label="分类2" value="2"></el-option>
            <el-option label="分类3" value="3"></el-option>
          </el-select>
        </div>
        <div class="item">
          <el-text>分类</el-text>
          <el-select placeholder="请选择分类" style="width: 200px; margin-right: 10px">
            <el-option label="分类1" value="1"></el-option>
            <el-option label="分类2" value="2"></el-option>
            <el-option label="分类3" value="3"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="loadData">刷新数据</el-button>
      </div>

      <el-button type="primary" @click="handleCreateBlog">新增博客</el-button>
    </div>

    <el-table :data="tableData" size="large">
      <el-table-column prop="date" label="封面" />
      <el-table-column prop="date" label="文章信息"> </el-table-column>

      <el-table-column prop="editType" label="编辑器" />

      <el-table-column prop="address" label="类型" />
      <el-table-column prop="address" label="允许评论" />
      <el-table-column prop="address" label="状态" />
      <el-table-column prop="address" label="时间" />

      <el-table-column prop="actions" label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
          <el-button type="text" @click="handlePreview(row)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-page-header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import API from "@/apis";
import BlogEdit from "./BlogEdit.vue";
import router from "@/router";

// =================================== 表格数据 ===================================

interface FormDataType {
  cover: string;
  name: string;
  desc: string;
  blogCount: number;
}
const tableData = ref<FormDataType[]>([]);
async function loadData() {}

function handleCreateBlog() {
  router.push("/blog/edit");
}
function handleEdit(row: FormDataType) {
  console.log("Editing row:", row);
}

function handleDelete(row: FormDataType) {
  console.log("Deleting row:", row);
}

function handlePreview(row: FormDataType) {
  console.log("Deleting row:", row);
}

// =================================== 对话框 ===================================
const dialogVisible = ref(true);
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;

  .left-section {
    display: flex;
    align-items: center;
    gap: 8px;
    .item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>

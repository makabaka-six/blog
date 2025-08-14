<template>
  <el-page-header @back="router.back()">
    <template #content>
      <span> 博客管理 </span>
    </template>

    <!-- 搜索栏 -->
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

    <!-- 表格 -->
    <el-table :data="tableData" size="large">
      <el-table-column label="封面">
        <template #default="{ row }">
          <ImagePreview :src="row.cover" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="文章信息"> </el-table-column>

      <el-table-column prop="editType" label="编辑器" />
      <el-table-column prop="address" label="类型" />
      <el-table-column prop="address" label="允许评论" />
      <el-table-column prop="address" label="状态" />
      <el-table-column prop="address" label="时间" />

      <el-table-column prop="actions" label="操作" width="240">
        <template #default="{ row }">
          <el-button-group>
            <el-button type="primary" :icon="View" @click="handlePreview(row)" />
            <el-button type="primary" :icon="Edit" @click="handleEdit(row)" />
            <el-button type="danger" :icon="Delete" @click="handleDelete(row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-page-header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import API from "@/apis";

import ImagePreview from "@/components/ImagePreview.vue";
import { Delete, Edit, View } from "@element-plus/icons-vue";

// =================================== 表格 ===================================

const tableData = ref([]);

onMounted(async () => {
  loadData();
});

const loadData = async () => {
  const result = await API.getBlogList({
    skip: (currentPage.value - 1) * pageSize.value,
    take: pageSize.value
  });

  tableData.value = result.data.rows;
  total.value = result.data.total;
};

const handleCreateBlog = () => {
  router.push("/blog/edit");
};

const handleEdit = async (row: any) => {
  await router.push(`/blog/edit?id=${row.id}`);
};
const handleDelete = (row: any) => {};
const handlePreview = (row: any) => {};

// ======================================= 分页 ========================================
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const handlePageChange = (page: number) => {
  currentPage.value = page;

  loadData();
};
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

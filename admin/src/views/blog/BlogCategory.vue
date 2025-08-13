<template>
  <el-page-header @back="">
    <template #content>
      <span> 创建博客 </span>
    </template>

    <div class="search-bar">
      <el-button type="primary" @click="handleCreateCategory">新建分类</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cover" label="封面" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="blogCount" label="博客数量" />
      <el-table-column prop="actions" label="操作" width="240">
        <template #default="{ row }">
          <el-button type="text" @click="handleEditCategory(row)">编辑</el-button>
          <el-button type="text" @click="handleDeleteCategory(row)">删除</el-button>
          <el-button type="text" @click="handleDeleteCategory(row)">上移</el-button>
          <el-button type="text" @click="handleDeleteCategory(row)">下移</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" label-width="auto">
        <el-form-item label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload class="upload-demo" action="" list-type="picture-card" :show-file-list="false" :auto-upload="false">
            <i class="el-icon-plus"></i>
            <div class="el-upload__text">点击上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.desc" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" :loading="submitting" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-page-header>
</template>

<script lang="ts" setup>
import API from "@/apis";
import Notify from "@/utils/notify";
import { computed, onMounted, ref, useTemplateRef } from "vue";

onMounted(async () => {
  loadData();
});

// =================================== 表格数据 ===================================
const tableData = ref<FormDataType[]>([]);

async function loadData() {
  try {
    const response = await API.getBlogCategoryList();
    console.log("分类列表数据:", response);
    tableData.value = response.data;
  } catch (error) {
    Notify.showMessage("获取分类列表失败", "error");
  }
}

async function handleCreateCategory() {
  dialogVisible.value = true;
  isEdit.value = false;
  formData.value.name = "";
}

async function handleEditCategory(row: any) {
  dialogVisible.value = true;
  isEdit.value = true;
  formData.value = { ...row };
}

function handleDeleteCategory(row: any) {}

// =================================== 分类对话框 ===================================
interface FormDataType {
  id?: number;
  name: string;
  desc: string;
}
const dialogVisible = ref(false);
const isEdit = ref(false);
const dialogTitle = computed(() => (isEdit.value ? "编辑分类" : "新建分类"));
const submitting = ref(false);
const formRef = useTemplateRef("formRef");
const defaultFormData: FormDataType = {
  id: 0,
  name: "",
  desc: ""
};
const formData = ref<FormDataType>({ ...defaultFormData });

async function handleSubmit() {
  try {
    submitting.value = true;

    if (isEdit.value) {
      if (!formData.value.id) {
        Notify.showMessage("分类ID不能为空", "error");
        return;
      }
      await API.updateBlogCategory({
        id: formData.value.id,
        name: formData.value.name,
        desc: formData.value.desc
      });
      Notify.showMessage("分类更新成功");
    } else {
      await API.createBlogCategory({
        name: formData.value.name,
        desc: formData.value.desc
      });

      Notify.showMessage("分类创建成功");
    }
    dialogVisible.value = false;
    loadData();
  } catch (error) {
  } finally {
    submitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  margin: 15px 0;
}
</style>

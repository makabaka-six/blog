<template>
  <el-page-header @back="router.back()">
    <template #content>
      <span> 分类管理 </span>
    </template>

    <div class="search-bar">
      <el-button type="primary" @click="handleCreateCategory">新建分类</el-button>
    </div>

    <el-table :data="tableData" height="800px" style="width: 100%">
      <el-table-column prop="cover" label="封面">
        <template #default="{ row }">
          <ImagePreview :src="row.cover" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="blogCount" label="博客数量" />

      <el-table-column prop="createdAt" label="创建时间">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="修改时间">
        <template #default="{ row }">
          {{ new Date(row.updatedAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="actions" label="操作" width="240">
        <template #default="{ row }">
          <el-button-group>
            <el-button :icon="ArrowUp" />
            <el-button :icon="ArrowDown" />
            <el-button type="primary" :icon="Edit" @click="handleEditCategory(row)" />
            <el-button type="danger" :icon="Delete" @click="handleDeleteCategory(row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="flex justify-center mt-4"
      v-model:current-page="currentPage"
      :page-size="10"
      :total="total"
      layout="total, prev, pager, next, jumper"
      background
      @current-change="" />

    <!-- 创建/编辑分类表单 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="cover">
          <ImageUpload v-model="formData.cover" :width="100" :height="100" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
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
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { Edit, Delete, ArrowUp, ArrowDown } from "@element-plus/icons-vue";

import API from "@/apis";
import Notify from "@/utils/notify";

import ImageUpload from "@/components/ImageUpload.vue";
import ImagePreview from "@/components/ImagePreview.vue";
import { ElMessageBox, type FormRules } from "element-plus";
import router from "@/router";

onMounted(async () => {
  loadData();
});
// ======================================= 表格数据 ========================================
const tableData = ref<FormType[]>([]);

const loadData = async () => {
  const result = await API.getBlogCategoryList();
  tableData.value = result.data.rows;
  total.value = result.data.total;
  console.log("分类数据加载成功", tableData.value);
};

const handleCreateCategory = () => {
  formData.value = { ...defaultFormData };
  isEdit.value = false;
  dialogVisible.value = true;
};

const handleEditCategory = (row: FormType) => {
  formData.value = { ...row };
  isEdit.value = true;
  dialogVisible.value = true;
};

const handleDeleteCategory = async (row: FormType) => {
  try {
    await ElMessageBox.confirm("确定删除该分类吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
    await API.deleteBlogCategory(row.id!);
    await loadData();
  } catch (error) {}
};

// ======================================= 分页 ========================================
const currentPage = ref(1);
const total = ref(0);
const handlePageChange = (page: number) => {
  currentPage.value = page;

  loadData();
};

// ======================================= 分类对话框 ========================================
interface FormType {
  id?: number;
  name: string;
  desc: string;
  cover?: string;
}
const dialogVisible = ref(false);
const isEdit = ref(false);
const dialogTitle = computed(() => (isEdit.value ? "编辑分类" : "新建分类"));
const submitting = ref(false);
const formRef = useTemplateRef("formRef");
const defaultFormData: FormType = {
  id: 0,
  name: "",
  desc: "",
  cover: ""
};
const formData = ref<FormType>({ ...defaultFormData });
const rules: FormRules<FormType> = {
  name: [
    { required: true, message: "分类名称不能为空", trigger: "blur" },
    { min: 2, max: 20, message: "长度范围[2,20]", trigger: "blur" }
  ],
  desc: [{ max: 100, message: "描述长度不能超过100个字符", trigger: "blur" }]
};

async function handleSubmit() {
  try {
    submitting.value = true;

    await formRef.value?.validate();

    if (isEdit.value) {
      if (!formData.value.id) {
        Notify.showMessage("分类ID不能为空", "error");
        return;
      }
      await API.updateBlogCategory({
        id: formData.value.id,
        name: formData.value.name,
        cover: formData.value.cover,
        desc: formData.value.desc
      });
      Notify.showMessage("分类更新成功");
    } else {
      await API.createBlogCategory({
        name: formData.value.name,
        cover: formData.value.cover,
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

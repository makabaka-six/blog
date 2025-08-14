<template>
  <el-page-header @back="handleBack">
    <template #content>
      <span> 创建博客 </span>
    </template>

    <el-input class="title-input" v-model="formData.title" placeholder="请输入博客标题"></el-input>
    <MdEditor v-model="formData.content" @save="handleSave" @onUploadImg="onUploadImg" />

    <!-- 创建表单 -->
    <el-dialog v-model="dialogVisible" title="标题">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="分类" prop="category">
          <el-select v-model="formData.categoryId" placeholder="请选择分类">
            <el-option :label="item.label" :value="item.value" v-for="item in blogCategoryOptions" />
          </el-select>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <ImageUpload v-model="formData.cover" />
        </el-form-item>

        <el-form-item label="类型" prop="blogType">
          <el-radio-group v-model="formData.blogType">
            <el-radio value="original">原创</el-radio>
            <el-radio value="reprint">转载</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="原文地址" prop="originalAddress" v-if="formData.blogType === 'reprint'">
          <el-input v-model="formData.originalAddress" placeholder="请输入原文地址"></el-input>
        </el-form-item>

        <el-form-item label="评论" prop="allowComment">
          <el-radio-group v-model="formData.allowComment">
            <el-radio :value="false">不允许</el-radio>
            <el-radio :value="true">允许 <el-text type="info">请在评论设置中配置好相应参数,评论才会生效</el-text></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="摘要" prop="abstract">
          <el-input v-model="formData.abstract" type="textarea" placeholder="请输入摘要" :rows="4"></el-input>
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <div class="flex gap-2">
            <el-tag v-for="tag in formData.tags" :key="tag" closable :disable-transitions="false" @close="handleTagClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input
              ref="tagInputRef"
              v-if="tagInputVisible"
              v-model="tagInputValue"
              class="w-20"
              size="small"
              @keyup.enter="handleTagAdd"
              @blur="handleTagAdd" />
            <el-button v-else class="button-new-tag" size="small" @click="showTagInput"> + 新标签 </el-button>
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </el-page-header>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, useTemplateRef } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import API from "@/apis";
import router from "@/router";

import type { FormRules } from "element-plus";
import ImageUpload from "@/components/ImageUpload.vue";
import Notify from "@/utils/notify";

import { useRoute } from "vue-router";
const route = useRoute();

onMounted(async () => {
  loadBlogCategoryOptions();
  const id = route.query["id"];
  if (id) {
    const result = await API.getBlogDetail(id.toString());
    formData.value = result.data;
  } else {
    formData.value = { ...defaultFormData };
  }
});

const blogCategoryOptions = ref<{ label: string; value: number }[]>([]);
const loadBlogCategoryOptions = async () => {
  try {
    const result = await API.getBlogCategoryOptions();
    blogCategoryOptions.value = result.data;
  } catch (error) {
    Notify.showMessage("加载分类失败", "error");
  }
};

// ======================================= 编辑器 ========================================

const onUploadImg = async (files: File[], callback: Function) => {
  const res = await Promise.all(
    files.map(file => {
      return new Promise(async (rev, rej) => {
        const form = new FormData();
        form.append("file", file);
        API.uploadImage(form)
          .then(res => rev(res))
          .catch(error => rej(error));
      });
    })
  );
  callback(res.map((item: any) => item.data.url));
};

const handleBack = () => {
  router.back();
};

const handleSave = () => {
  dialogVisible.value = true;
};

// ======================================= 表单 ========================================
interface FormData {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
  cover: string;
  editorType: "markdown" | "richText";
  blogType: "original" | "reprint";
  originalAddress: string;
  allowComment: boolean;
  abstract: string;
  tags: string[];
}

const dialogVisible = ref(false);
const formRef = useTemplateRef("formRef");
const defaultFormData: FormData = {
  title: "未命名",
  content: "",
  categoryId: 0,
  cover: "",
  editorType: "markdown",
  blogType: "original",
  originalAddress: "",
  allowComment: false,
  abstract: "",
  tags: []
};
const formData = ref<FormData>({ ...defaultFormData });
const rules: FormRules<FormData> = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  categoryId: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传封面图片", trigger: "blur" }],
  blogType: [{ required: true, message: "请选择博客类型", trigger: "blur" }],
  allowComment: [{ required: true, message: "请选择评论设置", trigger: "blur" }],
  originalAddress: [{ required: true, message: "请输入原文地址", trigger: "blur" }]
};

const handleSubmit = async () => {
  try {
    console.log(JSON.stringify(formData.value, null, 2));
    await formRef.value?.validate();
    if (formData.value.id) {
      // 更新博客
      const result = await API.updateBlog(formData.value);
      Notify.showMessage("博客更新成功", "success");
    } else {
      // 创建新博客
      formData.value.id = undefined; // 确保新建时没有ID
      const result = await API.createBlog(formData.value);
    }
    Notify.showMessage("表单提交成功", "success");
    dialogVisible.value = false;
    // router.push("/blog/list");
  } catch (error) {}
};

// ======================================= 标签 ========================================
const tagInputValue = ref<string>("");
const tagInputVisible = ref(false);
const tagInputRef = useTemplateRef("tagInputRef");

const showTagInput = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    tagInputRef.value?.focus();
  });
};
const handleTagAdd = () => {
  if (tagInputValue.value.trim() === "") return;
  if (formData.value.tags.includes(tagInputValue.value.trim())) {
    Notify.showMessage("标签已存在", "warning");
    return;
  }
  if (formData.value.tags.length >= 10) {
    Notify.showMessage("最多只能添加10个标签", "warning");
    return;
  }
  formData.value.tags.push(tagInputValue.value.trim());
  tagInputValue.value = "";
  tagInputVisible.value = false;
};
const handleTagClose = (tag: string) => {
  formData.value.tags = formData.value.tags.filter(t => t !== tag);
};
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
  height: calc(100vh - 200px);

  .md-editor-icon {
    width: 24px;
    height: 24px;
  }

  #md-editor-v-0-preview > details > summary {
    z-index: 0;
  }
}
</style>

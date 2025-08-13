<template>
  <div class="aside-menu">
    <el-button type="primary" class="post-btn">发布</el-button>
    <el-menu class="border-none" :collapse-transition="false" unique-opened :default-active="defaultActive" router>
      <template v-for="item in menus" :key="item.frontPath">
        <!-- 二级菜单 -->
        <el-sub-menu v-if="item.children && item.children.length > 0" :key="item.title" :index="item.frontPath">
          <template #title>
            <span :class="item.icon" style="margin-right: 5px"></span>
            <span>{{ item.title }}</span>
          </template>

          <el-menu-item v-for="item2 in item.children" :key="item2.title" :index="item2.frontPath">
            <template #title>
              <span>{{ item2.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 二级菜单(无子节点) -->
        <el-menu-item v-else :index="item.frontPath">
          <span :class="item.icon" style="margin-right: 5px"></span>
          <span> {{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// import store from "@/stores";

const defaultActive = ref("/blog/list");
const menus = [
  {
    title: "博客",
    frontPath: "/blog",
    icon: "iconfont icon-blog",
    children: [
      { title: "博客管理", frontPath: "/blog/list" },
      { title: "分类管理", frontPath: "/blog/category" }
    ]
  },
  {
    title: "专题",
    icon: "iconfont icon-collection",
    frontPath: "/",
    children: [{ title: "专题管理", frontPath: "" }]
  },
  {
    title: "设置",
    icon: "iconfont icon-setting",
    frontPath: "",
    children: [
      { title: "个人信息", frontPath: "" },
      { title: "博客成员", frontPath: "" },
      { title: "系统设置", frontPath: "" }
    ]
  },

  {
    title: "回收站",
    icon: "iconfont icon-recycle",
    frontPath: "",
    children: null
  }
];
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}

.aside-menu {
  width: 100%;
  height: 100%;
  padding: 10px;
  border-right: 1px solid #ddd;

  .post-btn {
    width: 100%;
    height: 40px;
    // background: green;
    // color: #fff;
    margin-bottom: 10px;
  }
}
</style>

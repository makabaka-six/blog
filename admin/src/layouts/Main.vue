<template>
  <el-header>
    <my-header />
  </el-header>
  <el-container>
    <el-aside width="250px">
      <aside-menu />
    </el-aside>

    <el-main>
      <div class="content">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import MyHeader from "./components/MyHeader.vue";
import AsideMenu from "./components/AsideMenu.vue";
</script>

<style lang="scss" scoped>
.el-header {
  height: 60px;
  border-bottom: 1px solid #e4e7ed;
}

.el-container {
  width: 100%;
  height: calc(100vh - 60px);
}

.el-main {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #f5f7f7;

  .content {
    width: 100%;
    height: 100%;
    padding: 15px 10px;
    border-radius: 10px;
    background: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    position: relative;

    .el-breadcrumb {
      margin-bottom: 10px;
    }
  }
}
</style>

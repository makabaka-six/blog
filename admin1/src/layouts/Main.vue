<template>
  <div class="layout">
    <el-header class="header"></el-header>
    <el-container class="container">
      <el-aside class="left-aside" width="200px">
        <div>ASIDE</div>
      </el-aside>
      <el-main class="right-main"> Main </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped></style>

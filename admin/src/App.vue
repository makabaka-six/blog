<template>
  <el-config-provider :locale="locale" :config="config">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { zhCn } from "element-plus/es/locales.mjs";
const locale = zhCn;
const config = ref({
  max: 1
});
</script>

<style lang="scss"></style>

<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="0px">
        <el-form-item prop="account">
          <el-input v-model="formData.account" placeholder="请输入账号" size="large">
            <template #prepend>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" size="large">
            <template #prepend>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input v-model="formData.checkCode" placeholder="请输入验证码" size="large">
              <template #prepend>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img class="check-code" :src="checkCodeUrl" alt="验证码" @click="refreshCheckCode" />
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="large" :style="{ width: '100%' }" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from "vue";
import router from "@/router";
import Notify from "@/utils/notify";
import API from "@/apis";

const formRef = useTemplateRef("formRef");
const formData = ref({
  account: "makabaka",
  password: "123456",
  checkCode: "1234",
  rememberMe: false
});

const rules = {
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  checkCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
};
const checkCodeUrl = ref("api/check-code?" + new Date().getTime());

function refreshCheckCode() {
  console.log("Refreshing check code");
  checkCodeUrl.value = "api/check-code?" + new Date().getTime();
}

async function handleLogin() {
  try {
    await formRef.value!.validate();

    const result = await API.login({
      account: formData.value.account,
      password: formData.value.password,
      checkCode: formData.value.checkCode.toLocaleLowerCase()
    });

    // if (formData.value.rememberMe) {
    //   const encryptedPassword = CryptoJS.AES.encrypt(formData.value.password, "makabaka_blog").toString();
    //   localStorage.setItem("account", formData.value.account);
    //   localStorage.setItem("password", encryptedPassword);
    // } else {
    //   localStorage.removeItem("account");
    //   localStorage.removeItem("password");
    // }

    Notify.showMessage("登录成功");
    await router.replace("/");
  } catch (error) {
    refreshCheckCode();
  }
}
</script>

<style lang="scss">
.login-body {
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image: url("@/assets/images/login-bg.jpg");

  .login-panel {
    width: 350px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ddd;
    background: #fff;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);

    .login-title {
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
    }
    .check-code-panel {
      display: flex;
      gap: 5px;
      .check-code {
        cursor: pointer;
      }
    }
  }
}
</style>

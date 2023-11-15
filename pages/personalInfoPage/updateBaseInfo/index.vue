<template>
  <div class="container animate__animated animate__fadeIn">
    <h2>基本信息</h2>
    <el-form
      ref="baseInfoRef"
      :model="baseInfo"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-baseInfo"
    >
      <el-form-item label="qq" prop="qq">
        <el-input v-model="baseInfo.qq" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="baseInfo.email" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(baseInfoRef)"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
    <h2>帐号安全</h2>
    <el-form
      ref="updatePassInfoRef"
      :model="updatePassInfo"
      status-icon
      :rules="rules2"
      label-width="120px"
      class="demo-baseInfo"
    >
      <el-form-item label="新密码" prop="pass">
        <el-input
          v-model="updatePassInfo.pass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="updatePassInfo.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updatePassInfo.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div style="display: flex">
          <el-input
            v-model="updatePassInfo.code"
            autocomplete="off"
          /><el-button
            type="primary"
            @click="submitForm(baseInfoRef)"
            plain
            style="margin-left: 10px"
            >发送验证码</el-button
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(baseInfoRef)"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { PASSWORDREG } from '../../../assets/data/tsConstant';

const baseInfoRef = ref<FormInstance>();

const updatePassInfoRef = ref<FormInstance>();

const checkNullContent = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("输入内容不得为空"));
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (updatePassInfo.pass.trim() !== "") {
      if (!updatePassInfoRef.value) return;
      updatePassInfoRef.value.validateField("pass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("请再次输入密码！"));
  } else if (value !== updatePassInfo.checkPass) {
    callback(new Error("两次输入密码不匹配！"));
  } else {
    callback();
  }
};

const baseInfo = reactive({
  qq: "",
  email: "",
});

const updatePassInfo = reactive({
  pass: "",
  checkPass: "",
  email: "",
  code: "",
});

const rules = reactive<FormRules<typeof baseInfo>>({
  qq: [{ validator: checkNullContent, trigger: "blur" }],
  email: [{ validator: checkNullContent, trigger: "blur" }],
});
const rules2 = reactive<FormRules<typeof updatePassInfo>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  email: [{ validator: checkNullContent, trigger: "blur" }],
  code: [{ validator: checkNullContent, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  h2 {
    text-align: left;
    font-size: 21px;
    color: #666;
    margin-left: 60px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
}
</style>

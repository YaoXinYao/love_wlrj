<template>
  <div class="container animate__animated animate__fadeIn">
    <client-only>
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
        <el-form-item label="博客" prop="blog">
          <el-input v-model="baseInfo.blog" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateSelfInformation(baseInfoRef)"
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
        class="demo-updatePass"
      >
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="updatePassInfo.newPassword"
            type="password"
            autocomplete="off"
            placeholder="6-12位且不含空格"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="againPassword">
          <el-input
            v-model="updatePassInfo.againPassword"
            type="password"
            autocomplete="off"
            placeholder="请再次输入密码进行确认"
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
              @click="sendCode"
              plain
              style="margin-left: 10px"
              :disabled="isDisabled"
              >{{ btnText }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword(updatePassInfoRef)"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EMAILREG, PASSWORDREG } from "@/assets/data/tsConstant";
import {
  updateUserSelfInformation,
  getLoginUser,
  sendEmail,
  updateUserPassword,
} from "~/service/user";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
//获取当前登录用户信息
const homeStore = useHomestore();
let { userinfo, user } = storeToRefs(homeStore);

const baseInfoRef = ref<FormInstance>();

const updatePassInfoRef = ref<FormInstance>();
const btnText = ref("发送验证码");
const isDisabled = ref(false);

const checkNullContent = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("输入内容不得为空"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!PASSWORDREG.test(value)) {
    callback(new Error("密码格式不正确"));
  } else {
    if (updatePassInfo.newPassword.trim() !== "") {
      if (!updatePassInfoRef.value) return;
      updatePassInfoRef.value.validateField("newPassword", () => null);
    }
    callback();
  }
};
const validateCheckPass = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("请再次输入密码！"));
  } else if (value !== updatePassInfo.newPassword) {
    callback(new Error("两次输入密码不匹配！"));
  } else {
    callback();
  }
};

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("请输入邮箱"));
  } else if (!EMAILREG.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};

const baseInfo = reactive({
  qq: userinfo.value.userQq,
  email: userinfo.value.userEmail,
  blog: userinfo.value.userBlog,
});

const updatePassInfo = reactive({
  newPassword: "",
  againPassword: "",
  email: "",
  code: "",
});

const rules = reactive<FormRules<typeof baseInfo>>({
  qq: [{ validator: checkNullContent, trigger: "blur" }],
  email: [{ validator: checkNullContent, trigger: "blur" }],
  blog: [{ validator: checkNullContent, trigger: "blur" }],
});
const rules2 = reactive<FormRules<typeof updatePassInfo>>({
  newPassword: [{ validator: validatePass, trigger: "blur" }],
  againPassword: [{ validator: validateCheckPass, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  code: [{ validator: checkNullContent, trigger: "blur" }],
});

const updateSelfInformation = (formValidate: FormInstance | undefined) => {
  if (!formValidate) return;
  formValidate.validate((valid) => {
    if (!valid) {
      ElMessage({
        type: "warning",
        message: "表单内容不符合规范",
      });
    } else {
      updateUserSelfInformation(baseInfo).then(async (res) => {
        console.log(res);
        if (res.data.value.code == 20000) {
          ElMessage({
            type: "success",
            message: "修改成功",
          });
          homeStore.updateUserInfo();
        } else {
          ElMessage({
            type: "error",
            message: "修改失败",
          });
        }
      });
    }
  });
};

const updatePassword = (formValidate: FormInstance | undefined) => {
  console.log(formValidate);
  if (!formValidate) return;
  console.log(formValidate);

  formValidate.validate((valid) => {
    console.log(valid);

    if (!valid) {
      ElMessage({
        type: "warning",
        message: "表单内容不符合规范",
      });
    } else {
      updateUserPassword(updatePassInfo).then((res) => {
        if (res.data.value.code == 20000) {
          ElMessage({
            type: "success",
            message: "修改成功",
          });
          formValidate.resetFields();
          homeStore.updateUserInfo();
        } else {
          ElMessage({
            type: "error",
            message: "修改失败，请重试！",
          });
        }
      });
    }
  });
};

const sendCode = async () => {
  let num = 30;
  isDisabled.value = true;
  let codeTimer: NodeJS.Timeout | null = setInterval(() => {
    btnText.value = `${num}秒后可点击`;
    num--;
    if (num <= 0) {
      if (codeTimer) clearInterval(codeTimer);
      codeTimer = null;
      isDisabled.value = false;
      btnText.value = `获取验证码`;
    }
  }, 1000);
  if (EMAILREG.test(updatePassInfo.email)) {
    let res = await sendEmail({ email: updatePassInfo.email, type: 1 });
    if (res.data.value.code == 20000) {
      ElMessage({
        type: "success",
        message: "发送成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: "发送失败",
      });
    }
  } else {
    ElMessage({
      type: "warning",
      message: "请输入正确的邮箱",
    });
  }
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

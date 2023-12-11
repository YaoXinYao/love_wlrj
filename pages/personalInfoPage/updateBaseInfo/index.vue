<!-- 个人信息修改页 -->
<template>
  <div class="container animate__animated animate__fadeIn">
    <client-only>
      <ReturnPersonalPage />
      <h2>基本信息</h2>
      <el-form
        ref="baseInfoRef"
        :model="baseInfo"
        status-icon
        :rules="rules"
        label-width="70px"
        class="demo-baseInfo"
      >
        <el-form-item label="qq" prop="qq">
          <el-input
            v-model="baseInfo.qq"
            autocomplete="off"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="baseInfo.email"
            autocomplete="off"
            maxlength="40"
            show-word-limit
          />
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
        label-width="70px"
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
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="updatePassInfo.email"
            autocomplete="off"
            maxlength="40"
            show-word-limit
          />
        </el-form-item> -->
        <el-form-item label="验证码" prop="code">
          <div style="display: flex">
            <el-input
              v-model="updatePassInfo.code"
              autocomplete="off"
              placeholder="在基本信息的邮箱中获取"
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
  sendEmail,
  updateUserPassword,
} from "~/service/user";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { useLoginout } from "../../../hooks/useLoginout";
//获取当前登录用户信息
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);

const baseInfoRef = ref<FormInstance>();

const updatePassInfoRef = ref<FormInstance>();
const btnText = ref("发送验证码");
const isDisabled = ref(false);

//校验是否为控制
const checkNullContent = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("输入内容不得为空"));
  } else {
    callback();
  }
};

//校验密码是否符合规范
const validatePass = (rule: any, value: any, callback: any) => {
  if (!PASSWORDREG.test(value)) {
    callback(new Error("密码格式不正确"));
  } else {
    callback();
  }
};

//校验二次输入的密码和第一次是否相同
const validateCheckPass = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("请再次输入密码！"));
  } else if (value !== updatePassInfo.newPassword) {
    callback(new Error("两次输入密码不匹配！"));
  } else {
    callback();
  }
};

//校验邮箱是否符合规范
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("请输入邮箱"));
  } else if (!EMAILREG.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};

//基础信息部分
const baseInfo = reactive({
  qq: userinfo.value.userQq,
  email: userinfo.value.userEmail,
  blog: userinfo.value.userBlog,
});

//修改密码部分
const updatePassInfo = reactive({
  newPassword: "",
  againPassword: "",
  email: userinfo.value.userEmail,
  code: "",
});

//定义校验规则
const rules = reactive<FormRules<typeof baseInfo>>({
  qq: [{ validator: checkNullContent, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  blog: [{ validator: checkNullContent, trigger: "blur" }],
});
const rules2 = reactive<FormRules<typeof updatePassInfo>>({
  newPassword: [{ validator: validatePass, trigger: "blur" }],
  againPassword: [{ validator: validateCheckPass, trigger: "blur" }],
  code: [{ validator: checkNullContent, trigger: "blur" }],
});

//修改用户信息
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
        if (res.data.value.code == 20000) {
          ElMessage({
            type: "success",
            message: "修改成功",
          });
          homeStore.updateUserInfo();
        } else if (res.data.value.code == 52003) {
          ElMessage({
            type: "error",
            message: "修改失败，邮箱已存在",
          });
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

//修改密码
const updatePassword = (formValidate: FormInstance | undefined) => {
  if (!formValidate) return;

  formValidate.validate((valid) => {
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
            message: "修改成功，请重新登录",
          });
          formValidate.resetFields();
          // homeStore.updateUserInfo();
          useLoginout();
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

//发送验证码
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
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <div class="content">
    <div class="baseInfo">
      <div class="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <el-space
        class="baseInfoText"
        direction="vertical"
        :size="10"
        alignment="start"
      >
        <div class="userName">
          用户名<img class="userSex" src="@/assets/image/female.png" />
        </div>
        <div class="userId">ID:12345612345</div>
      </el-space>
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>我的博客</span>
          <el-button type="primary" plain>修改</el-button>
        </div>
      </template>
      <div class="text item">
        <el-input
          v-model="blogLink"
          placeholder="请输入你的博客链接"
          clearable
        />
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
          <el-button type="primary" plain>修改</el-button>
        </div>
      </template>
      <div class="text item" style="display: flex; justify-content: center">
        <el-form
          label-width="100px"
          :model="updatePassword"
          style="max-width: 460px"
        >
          <el-form-item label="新密码">
            <el-input
              v-model="updatePassword.newPassword"
              placeholder="请输入新密码"
            />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="updatePassword.surePassword"
              placeholder="请再次确认密码"
            />
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input
              v-model="updatePassword.oldPassWord"
              placeholder="请输入旧密码"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>我的博客</span>
          <el-button type="primary" plain>修改</el-button>
        </div>
      </template>
      <div class="text item">
        <el-input
          v-model="blogLink"
          placeholder="请输入你的博客链接"
          clearable
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";

const imageUrl = ref("");
const blogLink = ref("");
const updatePassword = reactive({
  newPassword: "",
  oldPassWord: "",
  surePassword: "",
});

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  console.log(rawFile.type);
  let imgTypes = ["image/png", "image/jpeg", "image/webp"];
  if (imgTypes.indexOf(rawFile.type) == -1) {
    ElMessage.error("图片格式只能为jpg、png、webp格式！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/cssConstant.scss";
.avatar {
  width: 50%;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
  font-size: 17px;
  font-weight: 700;
  color: $groupColor;
}

.content {
  display: inline-block;
  width: 90%;
  margin: 0 5%;
}

.baseInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 6px 2px 8px #ccc;
  padding: 20px;
}
.userName {
  display: flex;
  align-items: center;
  width: 200px;
  height: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #666;
}
.userSex {
  width: 38px;
  margin: 0 10px;
}

.baseInfoText {
  flex: 1;
}

//博客
.box-card {
  margin: 20px 0;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  background-color: #fff;
  width: 140px;
  height: 140px;
  border-radius: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

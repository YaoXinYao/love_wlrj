<template>
  <div class="content">
    <div class="baseInfo">
      <div class="baseInfoCard">
        <div class="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              src="https://article.biliimg.com/bfs/article/2e4c0a3f6bfbc348feb3634f017ad8651733516338.png"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="infoCard"></div>
      </div>
      <div class="blog" :style="`height: ${blogHeight};`">
        <span class="blogLabel" @click="blogDisplayFun()">我的博客</span>
        <el-input
          v-model="blogLink"
          class="blogLink"
          placeholder="请输入你的博客链接"
          clearable
        />
      </div>
    </div>
    <!-- <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>我的博客</span>
          <el-button type="success" plain>修改</el-button>
        </div>
      </template>
      <div class="text item">
        <el-input
          v-model="blogLink"
          class="blogLink"
          placeholder="请输入你的博客链接"
          clearable
        />
      </div>
    </el-card> -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
          <el-button type="success" plain>修改</el-button>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";

const imageUrl = ref(
  "https://article.biliimg.com/bfs/article/2e4c0a3f6bfbc348feb3634f017ad8651733516338.png"
);
const blogLink = ref("");
const blogDisplay = ref(false);
const blogHeight = ref("40px");
const updatePassword = reactive({
  newPassword: "",
  oldPassWord: "",
  surePassword: "",
});

const blogDisplayFun = () => {
  // blogDisplay.value = !blogDisplay.value;
  if (blogHeight.value == "40px") {
    blogHeight.value = "120px";
  } else {
    blogHeight.value = "40px";
  }
};
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

.avatar-uploader {
  width: 140px;
  height: 140px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
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
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  // box-shadow: 6px 2px 8px #ccc;
  padding: 20px;
  // background-color: rgba(101, 167, 235, 0.4);
}

.baseInfoCard {
  width: max-content;
  position: relative;
}
.infoCard {
  width: 300px;
  height: 130px;
  background-color: #fff;
  position: absolute;
  left: 65px;
  top: 2px;
}

.avatar {
  position: relative;
  z-index: 2;
}
//博客
.box-card {
  margin: 20px 0;
}

.blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80px;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s;
}

.blogLabel {
  height: 40px;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
  color: $groupColor;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  // border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  background-color: transparent;
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

.blogLink {
  display: inline-block;
  width: 60%;
  height: 40px;

  .el-input__wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>

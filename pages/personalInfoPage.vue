<!-- 个人主页 -->
<template>
  <div class="container">
    <div class="headerDisplay">
      <el-image
        fit="cover"
        class="background_img"
        :src="PERSONALPAGEBG[bgIndex]"
      >
        <template #error>
          <div class="errorBg"></div>
        </template>
      </el-image>
      <div class="text__box one">未来软件工作室</div>
    </div>

    <div class="mainContainer">
      <div class="userAvatar">
        <el-upload
          class="avatar-uploader"
          action="/api/user/user/updatePictureSelf"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
          method="put"
          :headers="{ Authorization: Authtoken() }"
        >
          <el-avatar
            fit="cover"
            v-if="imageUrl"
            :src="userinfo.userPicture"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div class="userBase">
        <span class="userName">{{ userinfo.userName }}</span>
        <span>{{ userinfo.userClass }}</span>
      </div>

      <!-- 个人信息、课表、成绩、请假、最新公告 -->
      <div class="moduleContainer">
        <NuxtPage></NuxtPage>
      </div>
      <div class="slogan">
        <p class="text">做一个有影响力的人，做一个有影响力的团队</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import {
  ElMessage,
  type UploadFile,
  type UploadFiles,
  type UploadProps,
} from "element-plus";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { PERSONALPAGEBG } from "~/assets/data/tsConstant";
const homeStore = useHomestore();
let { userinfo, user } = storeToRefs(homeStore);
const imageUrl = ref(userinfo.value.userPicture);
const bgIndex = ref<number>(0);

definePageMeta({
  layout: "person",
  roles: 1,
});
useHead({
  meta: [{ name: "referrer", content: "no-referrer" }],
});

onMounted(() => {
  let len = PERSONALPAGEBG.length;
  bgIndex.value = Math.floor(Math.random() * len);
  console.log(PERSONALPAGEBG[bgIndex.value]);
});

//上传头像成功回调
const handleAvatarSuccess: UploadProps["onSuccess"] = async (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  homeStore.updateUserInfo();
  ElMessage.success("上传成功");
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  let imgTypes = ["image/png", "image/jpeg", "image/webp"];
  if (imgTypes.indexOf(rawFile.type) == -1) {
    ElMessage.error("图片格式只能为jpg、png、webp格式！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过2MB");
    return false;
  }
  return true;
};

//上传头像失败回调
const handleAvatarError = (
  error: Error,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  ElMessage.error("上传失败");
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 4322481 */
  src: url("//at.alicdn.com/t/c/font_4322481_5xyo2bw9dmt.woff2?t=1699453831156")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4322481_5xyo2bw9dmt.woff?t=1699453831156")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4322481_5xyo2bw9dmt.ttf?t=1699453831156")
      format("truetype");
}

@font-face {
  font-family: "阿里妈妈黑体";
  src: url("@/assets/fonts/AlimamaShuHeiTi-Bold.ttf");
}

.container {
  background-color: rgb(238, 238, 238);
  padding-bottom: 50px;
}
.headerDisplay {
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;

  .background_img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.errorBg {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/image/personalPageBg/personalBg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.text__box {
  position: relative;
  overflow: hidden;
  width: 0;
  font-size: 40px;
  line-height: 50px;
  font-family: "阿里妈妈黑体";
  white-space: nowrap;
  color: #fff;
  animation: width 1.2s steps(7) forwards;
  letter-spacing: 2px;
  margin: 170px auto;

  &::after {
    content: "";
    position: absolute;
    right: 0px;
    height: 40px;
    border-right: 1px solid #fff;
    animation: showInfinite 0.5s 5 both; //	执行5次
  }
}
.one {
  animation-delay: 0s;
}

@keyframes width {
  0% {
    width: 0;
  }
  100% {
    width: 7.4em; //  单位em,表示一个字体的宽度
  }
}
@keyframes showInfinite {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.mainContainer {
  width: $originalWidth;
  background-color: #fff;
  height: max-content;
  padding: 10px 20px;
  margin: auto;
  margin-top: -50px;
  border-radius: 10px;
  transition: width 0.3s;
  position: relative;
  z-index: 10;
}

.avatar-uploader {
  width: 100%;
  height: 100%;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.userAvatar {
  width: 140px;
  height: 140px;
  position: relative;
  z-index: 0;
  margin: -60px auto;
}

.userBase {
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  font-size: 17px;
  letter-spacing: 1px;
  margin: 80px auto;
  margin-bottom: 30px;

  .userName {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}

.moduleContainer {
  width: 100%;
  height: max-content;
  overflow: hidden;
}

.slogan {
  .text {
    line-height: 60px;
    color: #666;
    font-size: 14px;
    text-align: center;
  }
}

@media screen and (max-width: 1050px) {
  .mainContainer {
    width: $scaleWidth1;
  }
}

@media screen and (max-width: 850px) {
  .mainContainer {
    width: $scaleWidth2;
  }
}

@media screen and (max-width: 650px) {
  .mainContainer {
    width: $scaleWidth3;
  }
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
</style>

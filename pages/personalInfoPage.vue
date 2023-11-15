<template>
  <div class="container">
    <div class="backgroung_img">
      <div class="text__box one">未来软件工作室</div>
    </div>

    <div class="mainContainer">
      <div class="userAvatar">
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
      <div class="userBase">
        <span class="userName">用户名</span>
        <span>班级||性别</span>
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
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type UploadProps } from "element-plus";
definePageMeta({
  layout: "person",
});

const imageUrl = ref(
  "https://article.biliimg.com/bfs/article/2e4c0a3f6bfbc348feb3634f017ad8651733516338.png"
);

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
.backgroung_img {
  width: 100%;
  height: 340px;
  background-image: url("@/assets/image/personalBg.webp");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
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
  margin: 150px auto;
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
  width: 1000px;
  background-color: #fff;
  height: max-content;
  padding: 10px 20px;
  margin: auto;
  margin-top: -30px;
  border-radius: 10px;
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
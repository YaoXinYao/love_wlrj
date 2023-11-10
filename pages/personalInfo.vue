<template>
  <div class="container">
    <div class="mainContainer">
      <div class="aside">
        <div class="userBaseInfo">
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
          <div class="userName">用户名</div>
          <div class="userBlog">
            <div :class="['displayBlog', { hidden: isEditBlog }]">
              {{ blog }}
              <el-button
                type="primary"
                plain
                style="height: 25px"
                @click="() => (isEditBlog = true)"
                >编辑</el-button
              >
            </div>
            <div :class="['editBlog', { hidden: !isEditBlog }]">
              <input type="text" :value="blog" />
              <el-button
                type="primary"
                plain
                style="height: 27px"
                @click="() => (isEditBlog = false)"
                >保存</el-button
              >
            </div>
          </div>
        </div>
        <div class="noticeBox">
          <h3>
            <img src="@/assets/image/公告.png" class="noticeIcon" /><span
              >公告</span
            >
          </h3>
          <div class="noticeContent">
            <div class="noticeContent">
              这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告
            </div>
          </div>
        </div>
      </div>
      <div class="navContainer">
        <div class="nav">
          <ul>
            <li :class="route.path === '/personalInfo/score' ? 'active' : ''">
              <NuxtLink to="/personalInfo/score">成绩</NuxtLink>
            </li>
            <li
              :class="
                route.path === '/personalInfo/userTimeTable' ? 'active' : ''
              "
            >
              <NuxtLink to="/personalInfo/userTimeTable">课表</NuxtLink>
            </li>
            <li
              :class="route.path === '/personalInfo/leaveling' ? 'active' : ''"
            >
              <NuxtLink to="/personalInfo/leaveling">请假</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="navContent">
          <NuxtPage class="animate__animated animate__fadeIn"></NuxtPage>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css";
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type UploadProps } from "element-plus";

const route = useRoute();
console.log(route);

const isEditBlog = ref(false);
const blog = ref("https://www.neflibata.cn/");
const imageUrl = ref(
  "https://article.biliimg.com/bfs/article/2e4c0a3f6bfbc348feb3634f017ad8651733516338.png"
);
definePageMeta({
  layout: "person",
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
.container {
  width: 100%;
  background-color: rgb(247, 249, 254);
  height: calc(100vh - 70px);
  box-sizing: content-box;
}
.mainContainer {
  display: flex;
  width: $originalWidth;
  margin: auto;
  height: calc(100vh - 70px);
  margin-top: 70px;

  .aside {
    width: 300px;
    height: calc(100vh - 70px);
  }

  .navContainer {
    flex: 1;
    height: calc(100vh - 70px);
  }
}

.userBaseInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 10px;
  border: 1px solid #e0e3ed;
  box-sizing: border-box;
  background: linear-gradient(
    to bottom right,
    rgb(101, 167, 235, 0.8),
    rgb(101, 167, 235, 0.3)
  );
}
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
.avatar {
  position: relative;
  z-index: 0;
}

.userName {
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 18px;
  margin: 10px 0;
  font-weight: 700;
}

.userBlog {
  width: 100%;
  height: max-content;
  line-height: 25px;
  font-size: 16px;
  color: #666;
  text-align: center;
  color: $groupColor;

  .displayBlog {
    width: 90%;
    margin-left: 5%;
    display: inline-block;
    word-break: break-all;
    text-align: center;
    transition: all 0.2s;
  }

  .el-icon {
    margin: 0 5px;
    cursor: pointer;
  }

  .editBlog {
    display: flex;
    align-items: center;
    width: 90%;
    margin-left: 5%;
    transition: all 0.2s;

    input {
      flex: 1;
      border: none;
      height: 25px;
      outline: none;
      padding: 5px;
      box-sizing: border-box;
    }
  }
}

.hidden {
  height: 0;
  overflow: hidden;
}

.noticeBox {
  width: 100%;
  height: max-content;
  border: 1px solid #e0e3ed;
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  h3 {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 30px;
    }
  }

  .noticeContent {
    line-height: 30px;
  }
}

@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(15deg);
  }
  30% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(10deg);
  }
  70% {
    transform: rotate(-4deg);
  }
  90% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.noticeIcon {
  animation: swing 1.5s ease-in-out infinite;
  transform-origin: top center;
  margin-right: 5px;
}

//右侧
.nav {
  width: 90%;
  margin-left: 5%;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 5px 5px 15px rgb(219, 218, 218), -5px -5px 10px #fff;
  ul {
    list-style: none;
    white-space: nowrap;
    font-size: 0;
    li {
      display: inline-block;
      padding: 10px 20px;
      color: #666;
      font-size: 16px;
      transition: all 0.3s;
      box-sizing: border-box;
      border: 1px solid transparent;
      cursor: pointer;

      &:hover {
        color: #fff;
        border-radius: 5px;
        color: $groupColor;
      }
    }
  }
}

.navContent {
  overflow: auto;
  height: calc(100vh - 70px - 50px);
  padding-bottom: 50px;
}

//隐藏滚动条但是能滑动
.navContent::-webkit-scrollbar {
  width: 0px;
}
.active {
  border: 1px solid $groupColor !important;
  color: #fff !important;
  border-radius: 5px !important;
  color: $groupColor !important;
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

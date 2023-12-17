<template>
  <div class="container">
    <div class="header">
      <div class="headerContent">
        <NuxtLink to="/" class="logoBox">
          <img class="logo" src="@/assets/image/小组logo.png" />
          <span class="logoText">未来软件</span>
        </NuxtLink>
        <ul class="nav">
          <li><NuxtLink to="/forum/home">论坛</NuxtLink></li>
          <li><NuxtLink to="/proclamation">公告</NuxtLink></li>
          <li><NuxtLink to="/networkdisk">网盘</NuxtLink></li>
        </ul>
        <div class="navUser">
          <el-dropdown trigger="click" class="dropDown">
            <span class="el-dropdown-link">
              {{ userinfo.userName
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <li>
                    <NuxtLink to="/personalInfoPage/modules">个人中心</NuxtLink>
                  </li></el-dropdown-item
                >
                <el-dropdown-item>
                  <li>
                    <NuxtLink to="/messageCenter/postLike">消息中心</NuxtLink>
                  </li></el-dropdown-item
                >
                <el-dropdown-item>
                  <li>
                    <NuxtLink to="/admin/staff">后台管理</NuxtLink>
                  </li></el-dropdown-item
                >
                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <slot></slot>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useLoginout } from "~/hooks/useLoginout";
import { useHomestore } from "~/store/home";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
const exit = () => {
  useLoginout();
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "阿里妈妈黑体";
  src: url("@/assets/fonts/AlimamaShuHeiTi-Bold.ttf");
}
.block-col-2 .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.container {
  height: max-content;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid #ddd;
  z-index: 1000;
}

.headerContent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: $originalWidth;
  margin: 0 auto;
  height: 100%;
  transition: all 0.3s;
}
.logoBox {
  display: flex;
  justify-content: left;
  height: 100%;
  cursor: pointer;
}
.logo {
  height: 50px;
}

.logoText {
  display: inline-block;
  height: 100%;
  line-height: 70px;
  font-size: 28px;
  font-family: "阿里妈妈黑体";
  margin-left: -10px;
}

.nav {
  display: flex;
  justify-content: center;

  li {
    width: max-content;
    margin: 10px 10px;
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-radius: 5px;
    font-size: 17px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    transition: all 0.3s;

    &:hover {
      color: $groupColor;
      margin-top: 8px;
    }
  }
}

.navUser {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 60px;
}

.dropDown {
  cursor: pointer;
  color: #666;
  font-size: 17px;
  font-weight: 700;
}

@media screen and (max-width: 1050px) {
  .headerContent {
    width: $scaleWidth1;
  }

  .logoText {
    display: none;
  }
}

@media screen and (max-width: 850px) {
  .headerContent {
    width: $scaleWidth2;
  }
}

@media screen and (max-width: 650px) {
  .headerContent {
    width: $scaleWidth3;
  }

  .navUser {
    justify-content: center;
  }
}

.footer {
  width: 100%;
  height: 100px;
  background-color: rgb(41, 41, 41);
}
</style>

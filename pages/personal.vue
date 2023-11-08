<template>
  <div class="content">
    <div class="mainContent">
      <div class="sider">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group> -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon><User /></el-icon>
            <template #title>我的信息</template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><GoldMedal /></el-icon>
              <span>我的成绩</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </div>

      <el-scrollbar min-height="calc(100vh - 60px - 20px)" class="routerBox"
        ><NuxtPage></NuxtPage
      ></el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "person",
});

import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  User,
  Setting,
  GoldMedal,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
@import "@/assets/css/cssConstant.scss";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100vh - 60px - 20px);
}

.content {
  width: 100%;
  margin-top: 60px;
  background-color: rgb(247, 249, 254);
  min-height: calc(100vh - 60px - 20px);
}

.mainContent {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: $originalWidth;
  padding-top: 20px;
}

.sider {
  width: max-content;
  height: calc(100vh - 60px - 20px);
  background-color: #fff;
}

.routerBox {
  width: 100%;
  overflow: auto;
}
</style>

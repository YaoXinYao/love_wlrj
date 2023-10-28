<template>
  <div class="admin">
    <div class="entry">
      <div class="bar">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title><NuxtLink to="/admin/staff">人员管理</NuxtLink></template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </div>
      <el-scrollbar height="calc(100vh-60px-20px)" class="routerBox"
        ><NuxtPage></NuxtPage
      ></el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "person",
});
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
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
.admin {
  width: 100%;
  background-color: rgb(247, 249, 254);
  min-height: calc(100vh - 60px - 20px);
}
.entry {
  display: flex;
  justify-content: space-between;
  margin: 60px 0px 0px;
  width: $originalWidth;
}
.bar {
  background-color: $groupColor;
  width: max-content;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100vh - 60px);
  background-color: $groupColor;
  .el-menu-item {
    color: aliceblue;
  }
  .el-sub-menu__title * {
    color: aliceblue;
    .el-menu-item {
      color: black !important;
    }
  }
  .el-sub-menu .el-menu-item {
    color: black !important;
  }
  .el-sub-menu__title:hover * {
    color: $groupColor !important;
  }
  li:hover {
    color: $groupColor !important;
  }
  .el-menu-item.is-active {
    color: $groupColor !important;
    background-color: aliceblue;
  }
}
.routerBox {
  padding: 20px;
  width: 100%;
  overflow: auto;
}
</style>

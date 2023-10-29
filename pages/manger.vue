<template>
    <div class="manger">
      <div class="entry">
        <div class="bar">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <el-menu-item index="1">
              <el-icon v-if="isCollapse == false" @click="handleFold()"
                ><Fold
              /></el-icon>
              <el-icon v-if="isCollapse== true" @click="handleFold()"
                ><Expand
              /></el-icon>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <template #title
                ><NuxtLink to="/manger/staff">人员管理</NuxtLink></template
              >
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4">
              <el-icon><document /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="5">
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
    Expand,
    Fold,
  } from "@element-plus/icons-vue";
  let isCollapse = ref(false);
  const handleFold = () => {
    isCollapse.value = !isCollapse.value;
    console.log(isCollapse.value);
    
  };
  </script>
  <style scoped lang="scss">
  .manger {
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
  
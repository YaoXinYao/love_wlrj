<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-menu
          class="el-menu-vertical-demo"
          default-active="2"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <template #title>后台管理</template>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title
              ><NuxtLink to="/admin/staff" @click="skipAdd($event)"
                >人员管理</NuxtLink
              ></template
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
            <template #title
              ><NuxtLink to="/admin/rotationChart" @click="skipAdd($event)"
                >轮播管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><setting /></el-icon>
            <template #title>four</template>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon><document /></el-icon>
            <template #title
              ><NuxtLink to="/admin/announcement" @click="skipAdd($event)"
                >公告管理</NuxtLink
              ></template
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="icons">
            <el-icon size="20px" v-if="isCollapse==false" @click="handleFold()"
              ><Fold
            /></el-icon>
            <el-icon size="20px" v-if="isCollapse==true" @click="handleFold()"
              ><Expand
            /></el-icon>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>后台管理</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in title" :key="index">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { adminStore } from "~/store/admin";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Expand,
  Fold,
} from "@element-plus/icons-vue";
let isCollapse = ref(false);
let windowWidth = ref(0);
onMounted(() => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 600) {
    isCollapse.value = true;
  }
});

const handleFold = () => {
  isCollapse.value = !isCollapse.value;
  console.log(isCollapse.value);
};
const adminsStore = adminStore();
const { title } = storeToRefs(adminsStore);
function skipAdd(a: any) {
  let obj = {
    name: a.target.innerText,
    skip: a.target.getAttribute("href"),
  };
  let existIndex = -1;
  //判断是否已经点击过该模块
  for (let i = 0; i < title.value.length; i++) {
    if (title.value[i].name == obj.name) {
      existIndex = i;
      break;
    }
  }
  if (existIndex !== -1) {
    title.value.splice(existIndex, 1);
  }
  //添加新的对象
  title.value.push(obj);
}
</script>
<style scoped lang="scss">
.el-aside {
  min-height: 100vh;
  width: max-content;
  background-color: $groupColor;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: calc(100vh - 60px);
  background-color: $groupColor;
  .el-menu-item {
    color: aliceblue;
    a {
      width: 100%;
      height: 100%;
    }
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
    svg {
      color: $groupColor !important;
    }
  }
}
.el-menu {
  background-color: $groupColor;
  .el-icon {
    color: white;
  }
  .el-menu-item.is-active {
    background-color: white;
    color: $groupColor;
  }
}
.el-header {
  padding: 20px 10px;
  display: flex;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 3px 0px #c3cdd6;
  .el-breadcrumb {
    max-width: 500px;
    margin-left: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  svg:hover {
    color: $groupColor;
    cursor: pointer;
  }
}
.el-main {
  height: calc(100vh - 60px - 20px);
}
</style>

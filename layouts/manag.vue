<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="defaultRoute"
          :collapse="isCollapse"
        >
          <el-menu-item index="/admin" :disabled="true">
            <el-icon><icon-menu /></el-icon>
            <template #title>后台管理</template>
          </el-menu-item>
          <el-menu-item index="/admin/staff">
            <el-icon><User /></el-icon>
            <template #title
              ><NuxtLink to="/admin/staff" @click="skipAdd($event)"
                >人员管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/manageScore">
            <el-icon><document /></el-icon>
            <template #title
              ><NuxtLink to="/admin/manageScore" @click="skipAdd($event)"
                >成绩管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/authority" v-if="userinfo.roleId == 3">
            <el-icon><Filter /></el-icon>
            <template #title
              ><NuxtLink to="/admin/authority" @click="skipAdd($event)"
                >权限管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/rotationChart" v-if="userinfo.roleId != 1">
            <el-icon><PictureRounded /></el-icon>
            <template #title
              ><NuxtLink to="/admin/rotationChart" @click="skipAdd($event)"
                >轮播管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/forumManage">
            <el-icon><setting /></el-icon>
            <template #title
              ><NuxtLink to="/admin/forumManage" @click="skipAdd($event)"
                >论坛管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/announcement" v-if="userinfo.roleId != 1">
            <el-icon><Calendar /></el-icon>
            <template #title
              ><NuxtLink to="/admin/announcement" @click="skipAdd($event)"
                >公告管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/leaveling" v-if="userinfo.roleId != 1">
            <el-icon><document /></el-icon>
            <template #title
              ><NuxtLink to="/admin/leaveling" @click="skipAdd($event)"
                >请假管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item
            index="/admin/attendanceTime"
            v-if="userinfo.roleId != 1"
          >
            <el-icon><Timer /></el-icon>
            <template #title
              ><NuxtLink to="/admin/attendanceTime" @click="skipAdd($event)"
                >考勤时间管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/checking" v-if="userinfo.roleId != 1">
            <el-icon><Stopwatch /></el-icon>
            <template #title
              ><NuxtLink to="/admin/checking" @click="skipAdd($event)"
                >考勤管理</NuxtLink
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/admin/journalism" v-if="userinfo.roleId != 1">
            <el-icon><document /></el-icon>
            <template #title
              ><NuxtLink to="/admin/journalism" @click="skipAdd($event)"
                >新闻管理</NuxtLink
              ></template
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="headMain">
            <el-icon
              size="20px"
              v-if="isCollapse == false"
              @click="handleFold()"
              ><Fold
            /></el-icon>
            <el-icon size="20px" v-if="isCollapse == true" @click="handleFold()"
              ><Expand
            /></el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>后台管理</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in title" :key="index">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="headHome"><NuxtLink to="/">返回首页</NuxtLink></div>
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
import { useHomestore } from "~/store/home";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Expand,
  Fold,
  User,
  Filter,
  PictureRounded,
  Timer,
  Stopwatch,
  Calendar,
  Monitor,
} from "@element-plus/icons-vue";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
const route = useRoute();
let defaultRoute = ref("");
let isCollapse = ref(false);
let windowWidth = ref(0);
onMounted(() => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 700) {
    isCollapse.value = true;
  }
  defaultRoute.value = route.path;
});

const handleFold = () => {
  isCollapse.value = !isCollapse.value;
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
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100vh - 60px);
  background-color: rgba(101, 168, 235, 0);
  .el-menu-item {
    color: aliceblue;
    height: 50px;
    line-height: 50px;
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
    background-color: aliceblue;
  }
  li:hover {
    color: $groupColor !important;
    background-color: aliceblue;
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
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 3px 0px #c3cdd6;
  min-height: 60px !important;
  --el-header-height: auto;
  .headMain{
    display: flex;
  }
  .headHome{
    margin-right: 20px;
    cursor: pointer;
  }
  .headHome:hover{
    color: #48c6ef;
  }
  .el-breadcrumb {
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

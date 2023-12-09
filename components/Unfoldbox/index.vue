<template>
  <div :class="`unflodbox ${isflod ? 'avtivebox' : ''}`">
    <div class="unflodboxcontainer">
      <div class="title">
        <NuxtLink to="/">
          <img src="/images/小组logo.png" alt="" />
        </NuxtLink>
        <i @click="isflod = false" class="iconfont icon-guanbi"></i>
      </div>
      <div class="flodinner">
        <ClientOnly>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu index="2">
              <template #title>
                <i class="iconfont icon-wangpan"> </i>
                <span> 小组网盘</span>
              </template>
              <el-menu-item index="1-1">
                <NuxtLink to="/networkdisk/uploadfile"> 上传文件 </NuxtLink>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <i class="iconfont icon-wendang"> </i>
                <span>文档服务</span>
              </template>
              <el-menu-item index="4-1">小组文档</el-menu-item>
              <el-menu-item index="4-2">学习资料</el-menu-item>
              <el-menu-item index="4-3">软件资源</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="5">
              <template #title>
                <i class="iconfont icon-gonggao"> </i>
                <NuxtLink to="/blog" target="_parent">
                  <span>小组公告</span>
                </NuxtLink>
              </template>
            </el-menu-item>
            <el-sub-menu index="8">
              <template #title>
                <i class="iconfont icon--strategy"> </i>
                <span>关于我们</span>
              </template>
              <el-menu-item index="8-1">
                <NuxtLink to="/blog">博客展示</NuxtLink>
              </el-menu-item>
              <el-menu-item index="8-2">
                <NuxtLink to="/grouphistory">小组历史</NuxtLink>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="7" v-show="Authtoken() == ''">
              <template #title>
                <i class="iconfont icon-login"> </i>
                <NuxtLink to="/login" target="_parent">
                  <span>登录</span>
                </NuxtLink>
              </template>
            </el-menu-item>
            <el-sub-menu index="9" v-show="Authtoken() != ''">
              <template #title>
                <span>个人中心</span>
              </template>
              <el-menu-item index="9-1">
                <NuxtLink to="/personalInfoPage/modules"> 个人中心 </NuxtLink>
              </el-menu-item>
              <el-menu-item index="9-2">
                <NuxtLink to="/networkdisk/uploadfile"> 上传文件 </NuxtLink>
              </el-menu-item>
              <el-menu-item index="9-3">
                <NuxtLink to="/admin/staff"> 进入后台 </NuxtLink>
              </el-menu-item>
              <el-menu-item index="9-4" @click="useLoginout"
                >退出登录</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginout } from "~/hooks/useLoginout";
import { useHomestore } from "~/store/home";
const homestore = useHomestore();
const isflod = ref(false);
function changeflod(val: boolean) {
  isflod.value = val;
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
defineExpose({ changeflod });
</script>

<style scoped lang="scss">
.unflodbox {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: white;
  transition-duration: 0.3s;
  width: 0%;
  opacity: 0;
  overflow: hidden;
  height: 100vh;
  .unflodboxcontainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      cursor: pointer;
      width: 100%;
      align-self: center;
      height: 1rem;
      display: flex;
      padding-block: 0.05rem;
      padding-right: 0.1rem;
      padding-left: 0.5rem;
      justify-content: space-between;
      i {
        font-size: 0.5rem;
        line-height: 1rem;
      }
      img {
        height: 100%;
      }
    }
    .flodinner {
      flex: 1;
      width: 100%;
      i {
        width: 0.4rem;
      }
    }
  }
}
.avtivebox {
  width: 100%;
  opacity: 1;
}
</style>

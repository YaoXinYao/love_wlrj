<template>
  <div class="home">
    <ForumdataHead></ForumdataHead>
    <ForumdataMain></ForumdataMain>
    <div class="addPost" v-if="userinfo.userId != 0">
      <NuxtLink to="/forum/report">
        <el-icon><Plus /></el-icon>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {storeToRefs} from "pinia"
import { Plus } from "@element-plus/icons-vue";
import {useHomestore} from "~/store/home"
let userData = useHomestore()
let {userinfo} = storeToRefs(userData)
</script>

<style lang="scss" scoped>
.home {
  .addPost {
    position: fixed;
    right: 30px;
    bottom: 200px;
    padding: 7px;
    border-radius: 50%;
    background-color: #72bff3;
    .el-icon {
      color: aliceblue;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>

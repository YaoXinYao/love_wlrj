<template>
  <div class="animate__animated animate__fadeIn">
    <div class="btn">
      <!-- <el-button type="primary">修改</el-button>
      <el-button type="success">保存</el-button> -->
      <!-- <el-button type="danger">清空</el-button> -->
      <ReturnPersonalPage />
    </div>

    <Timetable :isEditCourse="true" :userId="userId" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
//获取当前登录用户信息
import { useHomestore } from "~/store/home";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);

let userId = userinfo.value.userId;
</script>

<style lang="scss" scoped>
.btn {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

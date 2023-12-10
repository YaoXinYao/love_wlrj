<!-- 个人课表页面 -->
<template>
  <div class="animate__animated animate__fadeIn">
    <div class="btn">
      <!-- <el-button type="primary">修改</el-button>
      <el-button type="success">保存</el-button> -->
      <!-- <el-button type="danger">清空</el-button> -->
      <ReturnPersonalPage />
    </div>

    <!-- 自定义组件用来对课表进行展示、删除、添加、更新 isEditCourse：是否可编辑课表 userId：用户id -->
    <Timetable :isEditCourse="isEdit" :userId="userId" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getIsEditCourseService } from "~/service/user";
//获取当前登录用户信息
import { useHomestore } from "~/store/home";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
let userId = userinfo.value.userId;
let isEdit = ref<boolean>(false);

onMounted(async () => {
  let getIsEditCourseRes = await getIsEditCourseService();
  if (getIsEditCourseRes.data.value.code == 20000) {
    if (getIsEditCourseRes.data.value.data == "1") {
      isEdit.value = false;
      ElMessage({
        type: "warning",
        message: "您暂无修改课表权限，可联系管理员获得该权限",
      });
    } else {
      isEdit.value = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.btn {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

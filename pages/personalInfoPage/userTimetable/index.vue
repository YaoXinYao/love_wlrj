<!-- 个人课表页面 -->
<template>
  <div class="animate__animated animate__fadeIn">
    <div class="btn">
      <!-- <el-button type="primary">修改</el-button>
      <el-button type="success">保存</el-button> -->
      <!-- <el-button type="danger">清空</el-button> -->
      <ReturnPersonalPage />
      <el-button
        type="primary"
        plain
        class="editTip"
        size="small"
        @click="tip = true"
        >编辑提示</el-button
      >
    </div>
    <el-dialog v-model="tip" title="注意事项" draggable width="30%">
      <el-card class="tip-card">
        <p>
          &emsp;&emsp;开始时间为开课周周一，如11周开课，则开始时间应当填写11周周一日期。
        </p>
        <p>
          &emsp;&emsp;结束时间为开课周周日，如11周结束，则开始时间应当填写11周周日日期。
        </p>
        <p>&emsp;&emsp;如中途课程进行了调整，可联系管理员开放权限。</p>
        <p>
          &emsp;&emsp;如果两个课程是同一节课，如一个为前10周，一个为后十周，可将两个课程合并填写，日期可填写为第1周至第20周。
        </p>
      </el-card>
    </el-dialog>

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
let tip = ref<boolean>(false);

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

.editTip {
  margin-left: 10px;
}

.tip-card {
  line-height: 25px;
  color: #666;
}
</style>

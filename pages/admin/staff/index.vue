<template>
  <div class="staff" v-loading="loading">
    <div class="header">
      <div>
        <el-select v-model="grade" clearable placeholder="可选择年级">
          <el-option
            v-for="item in grades"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select v-model="group" placeholder="可选组别">
          <el-option
            v-for="item in groups"
            :key="item.groupId"
            :label="item.groupName"
            :value="item.groupId"
          />
        </el-select>
        <el-input v-model="input" placeholder="请输入关键字" clearable />
        <el-button type="primary" :icon="Search" @click="selectStaff()"
          >搜索</el-button
        >
      </div>
      <div>
        <el-button
          type="info"
          @click="manageRole = true"
          v-if="userinfo.roleId == 3"
          >角色</el-button
        >
        <el-button
          type="warning"
          @click="manageGroup = true"
          v-if="userinfo.roleId != 1"
          >组别</el-button
        >
        <el-button
          type="danger"
          @click="jdageMore"
          v-if="userinfo.roleId == 3"
          >删除</el-button
        >
        <el-button
          type="success"
          @click="modelState = true"
          v-if="userinfo.roleId != 1"
          >导入</el-button
        >
        <el-button
          type="primary"
          @click="downTemplate"
          class="downfile"
          v-if="userinfo.roleId != 1"
          >下载导入模板</el-button
        >
      </div>
    </div>
    <div class="main">
      <Stafftable />
    </div>
    <StafftableModel></StafftableModel>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore } from "~/store/staff";
import { Search } from "@element-plus/icons-vue";
import { useHomestore } from "~/store/home";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
import { ref } from "vue";
let loading = ref(true);
let groups = ref<any>([]);
const staffStore = useStaffStore();
const {
  modelState,
  deleteModel,
  grades,
  grade,
  group,
  input,
  users,
  total,
  manageGroup,
  curTable,
  manageRole,
  moreDelete,
} = storeToRefs(staffStore);
onMounted(() => {
  staffStore.getGrades();
  staffStore.getAllUser(1, 7).then((res) => {
    if (res.code == 20000) {
      users.value = res.data?.records;
      total.value = res.data?.total;
      loading.value = false;
    } else {
      ElMessage.error("获取人员数据失败");
    }
  });
});
watch(grade, (newValue, oldValue) => {
  group.value = "";
  if (grade.value) {
    staffStore.getGroup(grade.value).then((res) => {
      if (res?.code == 20000) {
        groups.value = res?.data;
      } else {
        ElMessage.error("获取组别失败");
      }
    });
  }
});
//检索不同条件下的人员
function selectStaff() {
  curTable.value = 1;
  let groupId;
  if (group.value == "") {
    groupId = undefined;
  } else {
    groupId = Number(group.value);
  }
  staffStore
    .getAllUser(curTable.value, 7, groupId, input.value, grade.value)
    .then((res) => {
      if (res.code == 20000) {
        users.value = res.data?.records;
        total.value = res.data?.total;
      } else if (res.code == 400006) {
        users.value = [];
        total.value = 0;
        ElMessage.success("暂无数据");
      } else {
        ElMessage.error("获取人员数据失败");
      }
    });
}
//下载模板
function downTemplate() {
  let downloading = false;
  if (!downloading) {
    downloading = true;
    staffStore.download().then((res) => {
      const link = document.createElement("a");
      link.href = res;
      link.setAttribute("download", "用户导入模板.xlsx"); // 设置文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
const jdageMore = () => {
  if (moreDelete.value.length == 0) {
    ElMessage.warning("请先选择要删除的成员");
  } else {
    deleteModel.value = true;
  }
};
</script>

<style lang="scss" scoped>
.staff {
  width: 95%;
  margin: 0px auto;
}
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-select {
    width: 130px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .el-input {
    width: 180px;
    margin-bottom: 10px;
  }
  .el-button {
    margin-bottom: 10px;
  }
}
.main {
  padding: 15px 20px 0px 0px;
  border-radius: 5px;
  background-color: white;
  min-height: 200px;
  min-width: 950px;
}
</style>

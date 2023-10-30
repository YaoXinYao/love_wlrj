<template>
  <div class="">
    <div class="btn">
      <el-button type="primary">修改</el-button>
      <el-button type="success">保存</el-button>
      <el-button type="danger">清空</el-button>
    </div>

    <Timetable :editCourse="editCourse" />
  </div>
</template>

<script setup lang="ts">
const editCourse = (info: any) => {
  console.log(info);
};
</script>

<style lang="scss" scoped>
.btn {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

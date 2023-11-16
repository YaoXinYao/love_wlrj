<template>
  <div class="animate__animated animate__fadeIn">
    <div class="btn">
      <!-- <el-button type="primary">修改</el-button>
      <el-button type="success">保存</el-button> -->
      <!-- <el-button type="danger">清空</el-button> -->
    </div>

    <Timetable :isEditCourse="true" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.btn {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

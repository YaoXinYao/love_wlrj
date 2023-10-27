<template>
  <div class="container">
    <el-table :data="tableData" :border="parentBorder" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div>
            <h3>成绩</h3>
            <el-table :data="props.row.sonTable" :border="childBorder">
              <el-table-column label="代码" prop="code" />
              <el-table-column label="完成度" prop="final" />
              <el-table-column label="基础知识" prop="base" />
              <el-table-column label="平时分" prop="normal" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="考核名称" prop="name" />
      <el-table-column label="考核类型" prop="type" />
      <el-table-column label="考核类别" prop="assessType" />
      <el-table-column label="考核时间" prop="date" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = [
  {
    date: "2016-05-03",
    name: "头脑风暴",
    type: "笔试",
    assessType: "头脑风暴",
    sonTable: [
      {
        code: 88,
        final: 33,
        base: 44,
        normal: 55,
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}
</style>

<template>
  <div class="container animate__animated animate__fadeIn">
    <div class="headerBox">
      <ReturnPersonalPage />

      <el-select
        v-model="scoreType"
        class="m-2"
        placeholder="Select"
        style="width: 100px"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <!-- 成绩分析echart图，暂无法实现 -->
    <!-- <div class="echarts"><Echarts /></div> -->
    <SelfWrittenScore v-show="scoreType == '笔试'" />
    <SelfInterviewScore v-show="scoreType == '面试'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const scoreType = ref("笔试");

let typeOptions = ref([
  { value: "笔试", label: "笔试" },
  { value: "面试", label: "面试" },
]);
</script>

<style lang="scss" scoped>
.headerBox {
  display: flex;
  justify-content: space-between;
  height: 60px;
}
.echarts {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px 0;
}
.container {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}
</style>

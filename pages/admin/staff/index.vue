<template>
  <div class="staff">
    <div class="header">
      <div>
        <el-select v-model="select" clearable placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="input" placeholder="Please input" clearable />
        <el-button type="primary" :icon="Search">搜索</el-button>
      </div>
      <div>
        <el-button type="primary" :icon="Plus" @click="addModel=true">新增</el-button>
        <el-button type="danger" :icon="Minus" @click="deleteModel=true">删除</el-button>
        <el-button type="success" :icon="Upload" @click="modelState = true"
          >导入</el-button
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
import { Search, Plus, Minus, Upload } from "@element-plus/icons-vue";
import { ref } from "vue";
const select = ref("");
const input = ref("");
const options = [
  {
    value: "Option1",
    label: "2023",
  },
  {
    value: "Option2",
    label: "2022",
  },
  {
    value: "Option3",
    label: "2021",
  },
  {
    value: "Option4",
    label: "2020",
  },
  {
    value: "Option5",
    label: "2019",
  },
];
const staffStore = useStaffStore();
const { modelState,deleteModel,addModel} = storeToRefs(staffStore);
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
  width: 960px;
  .el-input {
    width: 200px;
    margin-left: 20px;
  }
}
.main {
  padding: 15px 20px 0px 0px;
  border-radius: 5px;
  background-color: white;
  min-height: 200px;
  min-width: 1000px;
}
</style>

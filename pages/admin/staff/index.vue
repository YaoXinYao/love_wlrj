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
        <el-button type="primary" :icon="Plus">新增</el-button>
        <el-button type="danger" :icon="Minus">删除</el-button>
        <el-button type="success" :icon="Upload" @click="modelState = true"
          >导入</el-button
        >
      </div>
    </div>
    <div class="main">
      <Stafftable />
      <el-pagination
        v-model:current-page="currentPage"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next, jumper"
        :total="400"
        @current-change="handleCurrentChange"
      />
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
const currentPage = ref(4);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
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
const { modelState } = storeToRefs(staffStore);
//改变当前页
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
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
  .el-input {
    width: 200px;
    margin-left: 20px;
  }
}
.main {
  padding: 18px 20px 0px 0px;
  border-radius: 5px;
  background-color: white;
  min-height: 200px;
  .el-pagination {
    margin-top: 16px;
    .demo-pagination-block + .demo-pagination-block {
      margin-top: 10px;
    }
    .demo-pagination-block .demonstration {
      margin-bottom: 16px;
    }
  }
}
</style>

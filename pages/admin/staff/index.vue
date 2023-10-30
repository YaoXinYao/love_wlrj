<template>
  <div class="staff">
    <div class="header">
      <div>
        <el-select v-model="value" clearable placeholder="Select">
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
        <el-button type="success" :icon="Plus">一键导入</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column property="date" label="年级" width="100">
        </el-table-column>
        <el-table-column property="code" label="学号" width="180">
        </el-table-column>
        <el-table-column property="name" label="姓名" width="120" />
        <el-table-column property="sex" label="性别" width="80" />
        <el-table-column label="班级" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="address" label="方向" width="80" />
        <el-table-column #default="scope" label="操作" show-overflow-tooltip>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search, Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
const value = ref("");
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
const tableData = [
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "后端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "后端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "后端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    address: "前端",
    code: "CA 90036",
  },
];
interface User {
  date: string;
  name: string;
  address: string;
}
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
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
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  min-height: 200px;
}
</style>

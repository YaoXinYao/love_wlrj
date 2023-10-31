import type { Stafftable } from '#build/components';
<template>
  <div class="Stafftable">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
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
      <el-table-column property="direction" label="方向" width="80" />
      <el-table-column #default="scope" label="操作" show-overflow-tooltip>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  sex: string;
  class: string;
  direction: string;
  code: string;
}
const tableData= [
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "后端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "后端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "后端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    date: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
];
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

<style lang="scss">
.Stafftable {
}
</style>

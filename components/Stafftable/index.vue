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
      <el-table-column property="grade" label="年级" width="100">
      </el-table-column>
      <el-table-column property="code" label="学号" width="180">
      </el-table-column>
      <el-table-column property="name" label="姓名" width="120" />
      <el-table-column property="sex" label="性别" width="60" />
      <el-table-column label="班级" width="100">
        <template #default="scope">{{ scope.row.grade }}</template>
      </el-table-column>
      <el-table-column property="direction" label="方向" width="80" />
      <el-table-column #default="scope" label="操作">
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
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore } from "~/store/staff";
import { ref } from "vue";
const currentPage = ref(4);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const satffData = useStaffStore();
const { deleteModel, editModel } = storeToRefs(satffData);
interface User {
  grade: string;
  name: string;
  sex: string;
  class: string;
  direction: string;
  code: string;
}
const tableData = [
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "后端",
    code: "CA 90036",
  },
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "后端",
    code: "CA 90036",
  },
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "后端",
    code: "CA 90036",
  },
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    grade: "2016",
    name: "Tom",
    sex: "男",
    class: "Los Angeles",
    direction: "前端",
    code: "CA 90036",
  },
  {
    grade: "2016",
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
  editModel.value = true;
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
  deleteModel.value = true;
};
//改变当前页
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 16px;
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }
}
</style>

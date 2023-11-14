<template>
  <div class="documentcommunity">
    <div class="documentheader">
      <div class="searchinput">
        <input placeholder="搜索文件" type="text" />
        <span>搜索</span>
      </div>
    </div>
    <div class="filelist">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="文件名" min-width="60" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="时间" min-width="60" />
        <el-table-column
          property="address"
          label="上传者"
          show-overflow-tooltip
        />
        <el-table-column property="address" label="操作" show-overflow-tooltip>
          <template #default="scope"> </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getfilelist } from "~/service/disk";
const res = await getfilelist(1, 10);
const multipleSelection = ref<any[]>([]);
console.log(res.data.value.data);
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};
const tableData: any[] = [
  {
    date: "2016-05-032016-05-032016-05-032016-05-032016-05-032016-05-032016-05-032016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style scoped lang="scss">
.documentcommunity {
  width: 100%;
  height: 100%;
  .documentheader {
    padding-inline: 0.2rem;
    width: 100%;
    height: 0.5rem;
    .searchinput {
      width: 2.5rem;
      position: relative;
      padding-block: 0.05rem;
      input {
        border: none;
        padding-left: 0.2rem;
        padding-right: 0.6rem;
        transition-duration: 0.3s;
        background-color: rgb(241, 243, 248);
        border: 1px white solid;
        border-radius: 25px;
        outline: none;
        height: 0.4rem;
        width: 2.5rem;
        &:hover {
          border: 1px solid rgb(6, 167, 255);
        }
      }
      span {
        cursor: pointer;
        user-select: none;
        border-left: 1px solid rgb(179, 179, 179);
        padding-left: 0.1rem;
        position: absolute;
        color: rgb(6, 167, 255);
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>

<template>
  <div class="forum">
    <el-form :inline="true" :model="condition">
      <el-form-item label="发帖者">
        <el-input v-model="condition.name" placeholder="发帖人姓名" />
      </el-form-item>
      <el-form-item label="帖子标签">
        <el-select v-model="condition.label" placeholder="标签">
          <el-option
            v-for="(item, index) in labels"
            :key="index"
            :label="item.labelName"
            :value="item.labelId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="帖子分栏">
        <el-select v-model="condition.subfield" placeholder="分栏">
          <el-option
            v-for="(item, index) in subfields"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="info">重置</el-button>
        <el-button type="success" @click="labelModel=true">标签管理</el-button>
        <el-button type="warning" @click="subfieldModel=true">分栏管理</el-button>
      </el-form-item>
    </el-form>
    <div class="main">
      <el-table
        :data="datas"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
      >
        <el-table-column property="timer" label="时间" width="180">
        </el-table-column>
        <el-table-column property="name" label="发帖人" width="150">
        </el-table-column>
        <el-table-column property="title" label="标题" width="200" />
        <el-table-column property="label" label="标签" width="120" />
        <el-table-column property="subfield" label="分栏" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="success" @click="lookModel = true">查看</el-button>
          <el-button type="danger" @click="deleteModel = true">删除</el-button>
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
    <forummanage-model></forummanage-model>
    <forummanage-labelmodel></forummanage-labelmodel>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { forumStore, forumManage } from "~/store/forum";
import { ref } from "vue";
const currentPage = ref(4);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const forums = forumStore();
let { datas } = storeToRefs(forums);
let manages = forumManage();
let { labelModel, subfieldModel, lookModel, deleteModel,labels } =storeToRefs(manages);
let condition = reactive({
  name: "",
  label: "",
  subfield: "",
});
interface dataType {
  value: string;
  label: string;
}
let subfields: dataType[] = [];
// 获取标签
manages.labelInfo(1,100)
//改变当前页
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="scss" scoped>
.main {
  padding: 18px 20px 0px 0px;
  border-radius: 5px;
  background-color: white;
  min-height: 200px;
  min-width: 1000px;
  td {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
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

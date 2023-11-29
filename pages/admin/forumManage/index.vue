<template>
  <div class="forum"  v-loading = "loading">
    <el-form :inline="true" :model="condition">
      <el-form-item label="标题">
        <el-input v-model="condition.title" placeholder="帖子名称" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="condition.content" placeholder="帖子内容" />
      </el-form-item>
      <el-form-item label="帖子分栏">
        <el-select v-model="condition.subfield" placeholder="分栏">
          <el-option
            v-for="(item, index) in subfields"
            :key="index"
            :label="item.subName"
            :value="item.subId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectPosts">搜索</el-button>
        <el-button type="info" @click="reset">重置</el-button>
        <el-button type="success" @click="labelModel = true" v-if="userinfo.roleId != 1"
          >标签管理</el-button
        >
        <el-button type="warning" @click="subfieldModel = true" v-if="userinfo.roleId != 1"
          >分栏管理</el-button
        >
      </el-form-item>
    </el-form>
    <div class="main">
      <el-table
        :data="mdatas"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        style="width: 100%"
      >
        <el-table-column
          property="postTime"
          label="时间"
          width="180"
        ></el-table-column>
        <el-table-column
          property="userName"
          label="发帖人"
          width="150"
        ></el-table-column>
        <el-table-column
          property="postTitle"
          label="标题"
          width="200"
        ></el-table-column>
        <el-table-column
          property="subName"
          label="分栏"
          width="120"
        ></el-table-column>
        <el-table-column
          property="postView"
          label="浏览量"
          width="120"
        ></el-table-column>
        <el-table-column #default="scope" label="操作">
          <el-button type="success" @click="handleEdit(scope.row)"
            >查看</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row)" v-if="userinfo.roleId != 1">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next, jumper"
        :page-size="7"
        :total="mtotal"
        @current-change="handleCurrentChange"
      />
    </div>
    <forummanage-model :condition="condition "></forummanage-model>
    <forummanage-labelmodel></forummanage-labelmodel>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { forumManage } from "~/store/forum";
import {useHomestore} from "~/store/home"
let userData = useHomestore()
let {userinfo} = storeToRefs(userData)
import { ref } from "vue";
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
let manages = forumManage();
let {
  labelModel,
  subfieldModel,
  lookModel,
  deleteModel,
  subfields,
  mdatas,
  postInfos,
  mtotal,
  deleteId,
  loading,
  currentPage
} = storeToRefs(manages);
let condition = reactive({
  title: "",
  content: "",
  subfield: "",
});
onMounted(() => {
  manages.labelInfo(1, 100);
  manages.subfieldInfo(1, 100);
  manages.getPosts(1, 7);
});
//改变当前页
const handleCurrentChange = (val: number) => {
  let subId;
  if (condition.subfield == "") {
    subId = undefined;
  } else {
    subId = Number(condition.subfield);
  }
  manages.getPosts(val, 7, condition.title, subId, condition.content);
};
function selectPosts() {
  let subId;
  if (condition.subfield == "") {
    subId = undefined;
  } else {
    subId = Number(condition.subfield);
  }
  manages.getPosts(1, 7, condition.title, subId, condition.content);
}
function reset() {
  condition.title = "";
  condition.content = "";
  condition.subfield = "";
  manages.getPosts(1, 7);
}
//查看此行帖子信息
const handleEdit = (row: any) => {
  postInfos.value = row;
  lookModel.value = true;
};
const handleDelete = (row:any)=>{
  deleteId.value.push(row.postId)
  deleteModel.value = true
}
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

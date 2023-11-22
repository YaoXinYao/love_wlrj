<template>
  <div class="container">
    <AddAccessInfo
      :dialogVisible="dialogVisible"
      @addAlert="addAlertHandle"
      @update_event="updateEvent"
    />
    <el-form :inline="true" :model="searchKeys">
      <el-form-item label="考核名称"
        ><el-input
          v-model="searchKeys.accessName"
          placeholder="考核名称"
          clearable
      /></el-form-item>
      <!-- <el-form-item label="考核类型"
        ><el-select v-model="searchKeys.accessType" placeholder="类型">
          <el-option
            v-for="item in searchKeys.accessType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          /> </el-select
      ></el-form-item> -->
      <!-- <el-form-item label="考核类别"
        ><el-select v-model="searchKeys.accessType" placeholder="类别">
          <el-option
            v-for="item in searchKeys.accessType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          /> </el-select
      ></el-form-item>
      <el-form-item label="考核时间">
        <el-date-picker
          v-model="searchKeys.accessTime"
          type="datetime"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="考核发起人"
        ><el-input
          v-model="searchKeys.accessPromoter"
          placeholder="考核发起人"
          clearable
      /></el-form-item>
      <el-form-item label="考核对象"
        ><el-input
          v-model="searchKeys.accessTarget"
          placeholder="考核对象"
          clearable
      /></el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="searchAccess">搜索</el-button>
        <el-button type="warning" @click="resetInfo">重置</el-button>
        <el-button type="success" @click="addAlert">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="accessInfo.data"
      :border="parentBorder"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="accessInfo">
            <h3>成绩</h3>
            <el-table
              :data="props.row.sonTable"
              :border="childBorder"
              class="accessScore"
            >
              <el-table-column type="expand">
                <template #default="accessComment">
                  <div class="accessInfo">
                    <h3>评语</h3>
                    <div>
                      <div
                        class="commentItem"
                        v-for="(c, index) in accessComment.row.comments"
                        :key="index"
                      >
                        <span class="reviewer"
                          ><img src="@/assets/image/评价.png" alt="" />评语{{
                            index + 1
                          }}</span
                        >
                        <p>{{ c.commentInfo }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="姓名" />
              <el-table-column label="代码" prop="代码" />
              <el-table-column label="完成度" prop="完成度" />
              <el-table-column label="基础知识" prop="基础知识" />
              <el-table-column label="平时分" prop="平时分" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="考核名称" prop="plan" />
      <el-table-column label="类别" prop="type">
        <template #default="scope"
          ><el-tag size="large">{{ scope.row.type }}</el-tag></template
        >
      </el-table-column>
      <!-- <el-table-column label="考核类型" prop="assessType">
        <template #default="scope"
          ><el-tag size="large" type="success">{{
            scope.row.assessType
          }}</el-tag></template
        >
      </el-table-column> -->
      <el-table-column label="发起者" prop="publisher" />
      <el-table-column label="考核对象" prop="subscribers" />
      <el-table-column label="考核时间" prop="deadline" />
      <el-table-column label="描述" prop="additional">
        <template #default="scope">
          <span v-if="scope.row.additional">{{ scope.row.additional }}</span>
          <span v-if="!scope.row.additional">暂无描述</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="danger"
            plain
            size="small"
            style="width: 55px; height: 32px"
            @click="deleteAccess(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :small="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { deleteAccessService, getAllAccessService } from "~/service/user";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { storeToRefs } from "pinia";
definePageMeta({
  layout: "manag",
});

const AccessPageInfoStore = useAccessPageInfoStore();
const dialogVisible = ref(false);
const { pageInfo } = storeToRefs(AccessPageInfoStore);

let accessInfo = reactive({ data: undefined });
const getAccessInfo = async (props: {
  keyword?: string;
  currentPage: number;
  pageSize: number;
}) => {
  const accessInfoRes = await getAllAccessService({
    name: props.keyword,
    nodePage: props.currentPage,
    pageSize: props.pageSize,
  });

  accessInfo.data = accessInfoRes.data.value.data.records;
  pageInfo.value.currentPage = accessInfoRes.data.value.data.current;
  pageInfo.value.pageSize = accessInfoRes.data.value.data.size;
  pageInfo.value.total = accessInfoRes.data.value.data.total;
};

const resetInfo = () => {
  pageInfo.value.currentPage = 1;
  getAccessInfo({
    currentPage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
  });
};

const searchAccess = async () => {
  if (searchKeys.accessName == "") {
    ElMessage({
      type: "warning",
      message: "请输入关键词",
    });
  } else {
    const accessInfoRes = await getAllAccessService({
      name: searchKeys.accessName,
      nodePage: pageInfo.value.currentPage,
      pageSize: pageInfo.value.pageSize,
    });

    console.log(accessInfo);

    accessInfo.data = accessInfoRes.data.value.data.records;
    pageInfo.value.currentPage = accessInfoRes.data.value.data.current;
    pageInfo.value.pageSize = accessInfoRes.data.value.data.size;
    pageInfo.value.total = accessInfoRes.data.value.data.total;
  }
};

getAccessInfo({
  currentPage: pageInfo.value.currentPage,
  pageSize: pageInfo.value.pageSize,
});

const handleSizeChange = async (val: number) => {
  console.log("当前每页大小:", val);

  pageInfo.value.pageSize = val;
  getAccessInfo({
    keyword:searchKeys.accessName,
    currentPage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
  });
};
const handleCurChange = async (val: number) => {
  console.log("当前页数", val);
  pageInfo.value.currentPage = val;
  getAccessInfo({
    keyword:searchKeys.accessName,
    currentPage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
  });
};

let searchKeys = reactive({
  accessName: "",
  accessPromoter: "",
  accessTarget: "",
  accessTime: "",
  accessType: [
    {
      value: "Option1",
      label: "Option1",
    },
    {
      value: "Option2",
      label: "Option2",
      disabled: true,
    },
    {
      value: "Option3",
      label: "Option3",
    },
  ],
});

const parentBorder = ref(false);
const childBorder = ref(false);
// const accessInfo = [
//   {
//     date: "2016-05-03",
//     name: "头脑风暴",
//     type: "笔试",
//     assessType: "头脑风暴",
//     accessTarget: "2023级",
//     accessPromoter: "2022级",
//     sonTable: [
//       {
//         姓名: "张三",
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//         comments: [
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//         ],
//       },
//       {
//         姓名: "张三",
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//         comments: [
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//         ],
//       },
//       {
//         姓名: "张三",
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//         comments: [
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//         ],
//       },
//       {
//         姓名: "张三",
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//         comments: [
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//           {
//             name: "person1",
//             commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "2016-05-03",
//     name: "头脑风暴",
//     type: "笔试",
//     assessType: "头脑风暴",
//     accessTarget: "2023级",
//     accessPromoter: "2022级",
//     sonTable: [
//       {
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//       },
//     ],
//   },
//   {
//     date: "2016-05-03",
//     name: "头脑风暴",
//     type: "笔试",
//     assessType: "头脑风暴",
//     accessTarget: "2023级",
//     accessPromoter: "2022级",
//     sonTable: [
//       {
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//       },
//     ],
//     comments: [
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//     ],
//   },
//   {
//     date: "2016-05-03",
//     name: "头脑风暴",
//     type: "笔试",
//     assessType: "头脑风暴",
//     accessTarget: "2023级",
//     accessPromoter: "2022级",
//     sonTable: [
//       {
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//       },
//     ],
//     comments: [
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//     ],
//   },
//   {
//     date: "2016-05-03",
//     name: "头脑风暴",
//     type: "笔试",
//     assessType: "头脑风暴",
//     accessTarget: "2023级",
//     accessPromoter: "2022级",
//     sonTable: [
//       {
//         代码: 0,
//         完成度: 0,
//         基础知识: 0,
//         平时分: 0,
//       },
//     ],
//     comments: [
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//       {
//         name: "person1",
//         commentInfo: "这是评价这是评价这是评价这是评价这是评价",
//       },
//     ],
//   },
// ];

const addAlert = () => {
  dialogVisible.value = !dialogVisible.value;
};

const addAlertHandle = (props: boolean) => {
  dialogVisible.value = props;
};
const updateEvent = (props: boolean) => {
  if (props) {
    getAccessInfo({
      currentPage: pageInfo.value.currentPage,
      pageSize: pageInfo.value.pageSize,
    });
  }
};
const deleteAccess = (ids: Array<number>) => {
  ElMessageBox.confirm("确认要删除该课程吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      let res = await deleteAccessService(ids);
      console.log(res);
      if (res.data.value.code === 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getAccessInfo({
          currentPage: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
        });
      } else {
        ElMessage({
          type: "error",
          message: "删除失败",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除操作",
      });
    });
};
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.container {
  padding: 20px 20px;
}
.accessInfo {
  width: 90%;
  padding-left: 5%;
  margin-top: 5px;

  .accessScore {
    margin-left: 8px;
  }

  h3 {
    margin: 10px;
    line-height: 30px;
    img {
      width: 20px;
    }
  }
}
.commentItem {
  font-family: "Times New Roman", Times, serif;
  margin-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  margin-left: 8px;
  .reviewer {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $groupColor;
    height: 30px;

    img {
      width: 20px;
    }
  }
  p {
    height: auto;
    line-height: 25px;
  }
}
</style>

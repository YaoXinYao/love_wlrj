<template>
  <div class="container">
    <AddAccessInfo
      :dialogVisible="accessDialogVisible"
      @addAlert="accessHandle"
      @update_event="updateEvent"
    />

    <ScoreTable
      :dialogVisible="scoreDialogVisible"
      @scoreAlert="scoreHandle"
      ref="watchScoreRef"
    />
    <InterviewList
      :dialogVisible="interviewDialogVisible"
      @interviewAlert="interviewHandle"
      ref="watchInterviewRef"
    />

    <AccessTypes
      :dialogVisible="typeDialogVisible"
      @typeAlert="typeHandle"
      ref="typeRef"
    />
    <el-form :inline="true" :model="manageSearchKeys">
      <el-form-item label="考核名称"
        ><el-input v-model="manageSearchKey" placeholder="考核名称" clearable
      /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchAccess">搜索</el-button>
        <el-button type="warning" @click="resetInfo">重置</el-button>
        <el-button type="success" @click="addAlert">新增</el-button>
        <el-button type="info" @click="accessTypeAlert">考核类型管理</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="accessInfo"
      :border="parentBorder"
      style="width: 100%"
      ref="tableRef"
      v-loading="isLoading"
    >
      <el-table-column label="考核名称" prop="plan" />
      <el-table-column label="类别" prop="type">
        <template #default="scope"
          ><el-tag size="large">{{ scope.row.type }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="考核类型" prop="assessType">
        <template #default="scope"
          ><el-tag size="large" type="success">{{
            scope.row.typeName
          }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="发起者" prop="publisherName" />
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
            type="warning"
            plain
            size="small"
            style="width: 55px; height: 32px"
            @click="watchAccess(scope.row)"
            >查看</el-button
          >
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
      v-model:current-page="managePageInfo.currentPage"
      v-model:page-size="managePageInfo.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :small="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="managePageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

import ScoreTable from "@/components/ScoreTable/index.vue";
import InterviewList from "@/components/InterviewList/index.vue";
import AccessTypes from "@/components/AccessTypes/index.vue";
import {
  deleteAccessService,
  getAllAccessService,
  getScoreByAccessService,
  getTemplateService,
  getTypesByIdService,
  getUserInfoById,
} from "~/service/user";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { storeToRefs } from "pinia";
const tableRef = ref();
import type { AccessResInfoType, ScorePageInfoListType } from "~/types/Access";

definePageMeta({
  layout: "manag",
});

const AccessPageInfoStore = useAccessPageInfoStore();
const isLoading = ref(false);
const accessDialogVisible = ref(false);

const scoreDialogVisible = ref(false);
const interviewDialogVisible = ref(false);
const typeDialogVisible = ref(false);
const addScoreNeedInfo = ref<AccessResInfoType>();

const watchScoreRef = ref<InstanceType<typeof ScoreTable>>();
const watchInterviewRef = ref<InstanceType<typeof InterviewList>>();
const typeRef = ref<InstanceType<typeof AccessTypes>>();
const { managePageInfo, manageSearchKey } = storeToRefs(AccessPageInfoStore);

const rowKeyArr = ref<any>([]);

function handleRow(row: any) {
  return row.id;
}

const accessInfo = ref<Array<AccessResInfoType>>([]);

const getAccessInfo = async (props: {
  keyword?: string;
  currentPage: number;
  pageSize: number;
}) => {
  isLoading.value = true;
  const accessInfoRes = await getAllAccessService({
    name: props.keyword,
    nodePage: props.currentPage,
    pageSize: props.pageSize,
  });

  accessInfo.value = accessInfoRes.data.value.data.records;
  console.log(accessInfo.value);

  if (accessInfo.value) {
    for (let i = 0; i < accessInfo.value.length; i++) {
      let user = await getUserInfoById(accessInfo.value[i].publisher as number);
      if (user.data.value.code == 20000) {
        accessInfo.value[i].publisherName = user.data.value.data.userName;
      } else {
        accessInfo.value[i].publisherName = "未知";
      }
      let typeName = "未知";
      if (accessInfo.value[i].typeId) {
        let typeNameRes = await getTypesByIdService(
          accessInfo.value[i].typeId as number
        );
        if (typeNameRes.data.value.code == 20000) {
          typeName = typeNameRes.data.value.data;
        }
      }
      accessInfo.value[i].typeName = typeName;
    }
  }
  managePageInfo.value.currentPage = accessInfoRes.data.value.data.current;
  managePageInfo.value.pageSize = accessInfoRes.data.value.data.size;
  managePageInfo.value.total = accessInfoRes.data.value.data.total;
  isLoading.value = false;
};

// const onExpand = async (row: any) => {
//   console.log(row);

//   let rowIndex = -1;
//   for (let i = 0; i < accessInfo.value.length; i++) {
//     if (row.id == accessInfo.value[i].id) {
//       rowIndex = i;
//     }
//   }
//   let managePageInfo = { pageIndex: 1, allPage: 0, allCount: 0, size: 0 };
//   console.log(accessInfo.value[rowIndex]);

//   accessInfo.value[rowIndex].managePageInfo = managePageInfo;
//   let ids = handleRow(row);
//   let index = rowKeyArr.value?.indexOf(ids);
//   if (index === -1) {
//     rowKeyArr.value?.push(ids);
//   } else {
//     rowKeyArr.value?.splice(index, 1);
//     return;
//   }

//   let templateRes = await getTemplateService(row.id);
//   if (templateRes.data.value.code == 400006) {
//     return;
//   }

//   let scoreInfoRes = await getScoreByAccessService({
//     nodePage: 1,
//     pageSize: 2,
//     pId: row.id,
//   });

//   if (scoreInfoRes.data.value.code == 20000) {
//     let { pageIndex, allPage, allCount, size } = scoreInfoRes.data.value.data;
//     managePageInfo = { pageIndex, allPage, allCount, size };
//     accessInfo.value[rowIndex].managePageInfo = managePageInfo;
//     const list = scoreInfoRes.data.value.data.list;
//     let scoreList = new Array(list.length);
//     accessInfo.value[rowIndex].templates = templateRes.data.value.data.types;

//     for (let i = 0; i < list.length; i++) {
//       let scores = list[i].scores;
//       let obj: { [x: string]: string } = {};
//       obj.id = list[i].id;
//       for (let j = 0; j < scores.length; j++) {
//         obj[scores[j].name] = scores[j].score;
//       }
//       let studentNameRes = await getUserInfoById(list[i].studentId);

//       obj["name"] = studentNameRes.data.value.data.userName;
//       obj["studentId"] = studentNameRes.data.value.data.userAccount;
//       scoreList.push(obj);
//     }
//     accessInfo.value[rowIndex].scoreList = scoreList;
//   } else {
//     return null;
//   }
// };

const resetInfo = () => {
  managePageInfo.value.currentPage = 1;
  manageSearchKey.value = "";
  getAccessInfo({
    keyword: "",
    currentPage: managePageInfo.value.currentPage,
    pageSize: managePageInfo.value.pageSize,
  });
};

const searchAccess = async () => {
  if (manageSearchKey.value == "") {
    ElMessage({
      type: "warning",
      message: "请输入关键词",
    });
  } else {
    managePageInfo.value.currentPage = 1;
    const accessInfoRes = await getAllAccessService({
      name: manageSearchKey.value,
      nodePage: 1,
      pageSize: managePageInfo.value.pageSize,
    });
    accessInfo.value = accessInfoRes.data.value.data.records;
    managePageInfo.value.currentPage = accessInfoRes.data.value.data.current;
    managePageInfo.value.pageSize = accessInfoRes.data.value.data.size;
    managePageInfo.value.total = accessInfoRes.data.value.data.total;
  }
};

getAccessInfo({
  keyword: manageSearchKey.value,
  currentPage: managePageInfo.value.currentPage,
  pageSize: managePageInfo.value.pageSize,
});

const handleSizeChange = async (val: number) => {
  managePageInfo.value.pageSize = val;
  getAccessInfo({
    keyword: manageSearchKey.value,
    currentPage: managePageInfo.value.currentPage,
    pageSize: managePageInfo.value.pageSize,
  });
};
const handleCurChange = async (val: number) => {
  managePageInfo.value.currentPage = val;
  getAccessInfo({
    keyword: manageSearchKey.value,
    currentPage: managePageInfo.value.currentPage,
    pageSize: managePageInfo.value.pageSize,
  });
};

let manageSearchKeys = reactive({
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

const addAlert = () => {
  accessDialogVisible.value = !accessDialogVisible.value;
};

const accessTypeAlert=()=>{
 typeDialogVisible.value=!typeDialogVisible.value 
}

const accessHandle = (props: boolean) => {
  accessDialogVisible.value = props;
};

const scoreHandle = (props: boolean) => {
  scoreDialogVisible.value = props;
};

const interviewHandle = (props: boolean) => {
  interviewDialogVisible.value = props;
};

const typeHandle = (props: boolean) => {
  typeDialogVisible.value = props;
};

const updateEvent = (props: boolean) => {
  manageSearchKey.value = "";
  if (props) {
    getAccessInfo({
      currentPage: managePageInfo.value.currentPage,
      pageSize: managePageInfo.value.pageSize,
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
      if (res.data.value.code === 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getAccessInfo({
          keyword: manageSearchKey.value,
          currentPage: managePageInfo.value.currentPage,
          pageSize: managePageInfo.value.pageSize,
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

const watchAccess = (row: any) => {
  console.log(row);

  if (row.type == "笔试") {
    scoreDialogVisible.value = true;
    watchScoreRef.value?.scoreTableId(row.id);
  } else {
    interviewDialogVisible.value = true;
    watchInterviewRef.value?.interviewId(row.subscribers, row.id);
  }
};

// const changeRowData = (row: any) => {
//   console.log(row);
//   let index = -1;
//   for (let i = 0; i < accessInfo.value.length; i++) {
//     if (accessInfo.value[i].id == row.id) {
//       index = i;
//     }
//   }
//   if (index != -1) {
//     console.log(accessInfo.value[index]);
//   }
// };
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
.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
</style>

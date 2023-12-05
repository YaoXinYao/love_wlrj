<template>
  <div class="container">
    <AddAccessInfo
      :dialogVisible="accessDialogVisible"
      @addAlert="accessHandle"
      @update_event="updateEvent"
    />

    <ScoreTable
      :dialogVisible="scoreDialogVisible"
      :getGrade="getGrade"
      :roleId="roleId"
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
        <el-button type="success" @click="addAlert" v-if="roleId != 1"
          >新增</el-button
        >
        <el-button type="info" @click="accessTypeAlert" v-if="roleId != 1"
          >考核类型管理</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="accessInfo"
      :border="parentBorder"
      style="width: 100%"
      ref="tableRef"
      v-loading="isLoading"
      :show-overflow-tooltip="true"
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
            :disabled="isDisableByGrade(scope.row.subscribers, false)"
            >查看</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            style="width: 55px; height: 32px"
            @click="deleteAccess(scope.row)"
            :disabled="isDisableByGrade(scope.row.subscribers, true)"
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
import { reactive, ref, onMounted } from "vue";
import ScoreTable from "@/components/ScoreTable/index.vue";
import InterviewList from "@/components/InterviewList/index.vue";
import AccessTypes from "@/components/AccessTypes/index.vue";
import {
  deleteAccessService,
  getAllAccessService,
  getLoginUser,
  getTypesByIdService,
  getUserInfoById,
} from "~/service/user";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { storeToRefs } from "pinia";
const tableRef = ref();
import type { AccessResInfoType } from "~/types/Access";

const AccessPageInfoStore = useAccessPageInfoStore();
const isLoading = ref(false);
const accessDialogVisible = ref(false);

const scoreDialogVisible = ref(false);
const interviewDialogVisible = ref(false);
const typeDialogVisible = ref(false);

const watchScoreRef = ref<InstanceType<typeof ScoreTable>>();
const watchInterviewRef = ref<InstanceType<typeof InterviewList>>();
const typeRef = ref<InstanceType<typeof AccessTypes>>();
const { managePageInfo, manageSearchKey } = storeToRefs(AccessPageInfoStore);
const accessInfo = ref<Array<AccessResInfoType>>([]);
const getGrade = ref<number>(0);
const roleId = ref<number>(1);
onMounted(async () => {
  let userInfoRes = await getLoginUser();
  if (userInfoRes.data.value.code == 20000) {
    getGrade.value = userInfoRes.data.value.data.userGrade as number;
    roleId.value = userInfoRes.data.value.data.roleId;
  }
});

definePageMeta({
  layout: "manag",
});

const isDisableByGrade = (grade: number, isEqual: boolean) => {
  if (isEqual) {
    if (getGrade.value >= grade) {
      return true;
    }
  } else {
    if (getGrade.value > grade) {
      return true;
    }
  }

  return false;
};

const isDisableByRole = (role: number, isEqual: boolean) => {
  if (isEqual) {
    if (roleId.value <= role) {
      return true;
    }
  } else {
    if (roleId.value < role) {
      return true;
    }
  }

  return false;
};
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
  if (roleId.value == 1) {
    ElMessage({
      type: "warning",
      message: "您还未获得该权限哦！",
    });
    return;
  }
  accessDialogVisible.value = !accessDialogVisible.value;
};

const accessTypeAlert = () => {
  if (roleId.value == 1) {
    ElMessage({
      type: "warning",
      message: "您还未获得该权限哦！",
    });
    return;
  }
  typeDialogVisible.value = !typeDialogVisible.value;
};

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

const deleteAccess = (row: any) => {
  if (getGrade.value >= (row.subscribers as number)) {
    ElMessage({
      type: "warning",
      message: "您还未获得该权限哦！",
    });
    return;
  }
  ElMessageBox.confirm("确认要删除该课程吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      let res = await deleteAccessService(row.id);
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
  if (getGrade.value > (row.subscribers as number)) {
    ElMessage({
      type: "warning",
      message: "您还未获得该权限哦！",
    });
    return;
  }
  if (row.type == "笔试") {
    scoreDialogVisible.value = true;
    watchScoreRef.value?.scoreTableId(row.id);
  } else {
    interviewDialogVisible.value = true;
    watchInterviewRef.value?.interviewId(row.subscribers, row.id);
  }
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
.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
</style>

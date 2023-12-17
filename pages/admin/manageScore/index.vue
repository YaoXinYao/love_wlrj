<!-- 后台成绩管理模块 -->
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
      :getGrade="getGrade"
      :roleId="roleId"
    />
    <InterviewList
      :dialogVisible="interviewDialogVisible"
      :getGrade="getGrade"
      :roleId="roleId"
      @interviewAlert="interviewHandle"
      ref="watchInterviewRef"
    />

    <AccessTypes
      :dialogVisible="typeDialogVisible"
      @typeAlert="typeHandle"
      ref="typeRef"
    />
    <el-form :inline="true" :model="manageSearchKeys" ref="searchRef">
      <el-form-item label="考核名称"
        ><el-input v-model="manageSearchName" placeholder="考核名称" clearable
      /></el-form-item>
      <el-form-item label="考核年级"
        ><el-input v-model="manageSearchGrade" placeholder="考核年级" clearable
      /></el-form-item>
      <el-form-item label="考核方向">
        <el-select v-model="manageSearchSubscribersType" style="width: 90px">
          <el-option label="全体" value="" />
          <el-option label="前端" :value="1" />
          <el-option label="后端" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="考核类型">
        <el-select v-model="manageSearchType" style="width: 90px">
          <el-option label="全部" value="" />
          <el-option label="笔试" value="笔试" />
          <el-option label="面试" value="面试" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchAccess" class="btn"
          >搜索</el-button
        >
        <el-button type="warning" @click="resetInfo" class="btn"
          >重置</el-button
        >
        <el-button
          type="success"
          @click="addAlert"
          v-if="roleId != 1"
          class="btn"
          >新增</el-button
        >
        <el-button
          type="info"
          @click="accessTypeAlert"
          v-if="roleId != 1"
          class="btn"
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
    >
      <el-table-column label="考核名称" prop="plan" fixed />
      <el-table-column label="类别" prop="type">
        <template #default="scope"
          ><el-tag size="large" type="success">{{
            scope.row.type
          }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="考核类型" prop="typeName">
        <template #default="scope"
          ><el-tag size="large">{{ scope.row.typeName }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="方向" prop="subscribersType">
        <template #default="scope">
          <el-tag size="large" type="danger">{{
            scope.row.subscribersType === 1
              ? "前端"
              : scope.row.subscribersType === 2
              ? "后端"
              : "全体"
          }}</el-tag>
        </template>
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
            class="btn"
            >查看</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            style="width: 55px; height: 32px"
            @click="deleteAccess(scope.row)"
            :disabled="isDisableByGrade(scope.row.subscribers, true)"
            class="btn"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      v-model:current-page="managePageInfo.currentPage"
      v-model:page-size="managePageInfo.pageSize"
      v-if="managePageInfo.total"
      :page-sizes="[5, 10, 15, 20]"
      :small="false"
      :pager-count="5"
      :layout="paginationLayout"
      :total="managePageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import ScoreTable from "@/components/ScoreTable/index.vue";
import InterviewList from "@/components/InterviewList/index.vue";
import AccessTypes from "@/components/AccessTypes/index.vue";
import { getLoginUser, getUserInfoById } from "~/service/user";
import {
  deleteAccessService,
  getAllAccessService,
  getAllTypesService,
  getTypesByIdService,
} from "~/service/access";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { storeToRefs } from "pinia";
const tableRef = ref();
import type { AccessResInfoType, AccessTypesType } from "~/types/Access";
import type { FormInstance } from "element-plus";
const accessPageInfoStore = useAccessPageInfoStore();
const isLoading = ref(false);
const accessDialogVisible = ref(false);
const scoreDialogVisible = ref(false);
const interviewDialogVisible = ref(false);
const typeDialogVisible = ref(false);
const watchScoreRef = ref<InstanceType<typeof ScoreTable>>();
const watchInterviewRef = ref<InstanceType<typeof InterviewList>>();
const typeRef = ref<InstanceType<typeof AccessTypes>>();
const {
  managePageInfo,
  manageSearchGrade,
  manageSearchName,
  manageSearchSubscribersType,
  manageSearchType,
} = storeToRefs(accessPageInfoStore);
const accessInfo = ref<Array<AccessResInfoType>>([]);
const getGrade = ref<number>(0);
const roleId = ref<number>(1);
const searchRef = ref<FormInstance>();
const windowWidth = ref(window.innerWidth);
let paginationLayout = ref<string>("total, sizes, prev, pager, next, jumper");
let writtenScoreList = ref<Array<AccessResInfoType>>([]);

definePageMeta({
  layout: "manag",
});

onMounted(async () => {
  let userInfoRes = await getLoginUser();
  if (userInfoRes.data.value.code == 20000) {
    getGrade.value = userInfoRes.data.value.data.userGrade as number;
    roleId.value = userInfoRes.data.value.data.roleId;
  }
  if (window.innerWidth <= 800) {
    paginationLayout.value = "total, prev, pager, next";
  } else {
    paginationLayout.value = "total, sizes, prev, pager, next, jumper";
  }
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = debounce(() => {
  windowWidth.value = window.innerWidth;

  if (windowWidth.value <= 800) {
    paginationLayout.value = "total, prev, pager, next";
  } else {
    paginationLayout.value = "total, sizes, prev, pager, next, jumper";
  }
}, 200); // 设置防抖延迟时间，单位为毫秒

/**
 * 判断用户是否有权操作
 * @param grade 考核对象年级
 * @param isEqual 比较是是否包括本年级
 */
const isDisableByGrade = (grade: number, isEqual: boolean) => {
  if (roleId.value == 3) {
    return false;
  }
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

//判断用户是否有权操作
const isDisableByRole = (role: number, isEqual: boolean) => {
  if (roleId.value == 3) {
    return false;
  }
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

//获取考核信息
const getAccessInfo = async (props: {
  name?: string;
  currentPage: number;
  pageSize: number;
  subscribers?: string;
  subscribersType?: string;
  type?: string;
}) => {
  isLoading.value = true;
  const accessInfoRes = await getAllAccessService({
    name: props.name,
    nodePage: props.currentPage,
    pageSize: props.pageSize,
    subscribers: props.subscribers,
    subscribersType: props.subscribersType,
    type: props.type,
  });
  accessInfo.value = accessInfoRes.data.value.data.records;
  console.log(accessInfo.value);

  managePageInfo.value.currentPage = accessInfoRes.data.value.data.current;
  managePageInfo.value.pageSize = accessInfoRes.data.value.data.size;
  managePageInfo.value.total = accessInfoRes.data.value.data.total;
  isLoading.value = false;
};

const resetInfo = () => {
  managePageInfo.value.currentPage = 1;
  manageSearchGrade.value = "";
  manageSearchName.value = "";
  manageSearchSubscribersType.value = "";
  manageSearchType.value = "";
  getAccessInfo({
    name: "",
    currentPage: managePageInfo.value.currentPage,
    pageSize: managePageInfo.value.pageSize,
    subscribers: "",
    subscribersType: "",
    type: "",
  });
};

//搜索
const searchAccess = async () => {
  managePageInfo.value.currentPage = 1;
  getAccessInfo({
    name: manageSearchName.value,
    subscribers: manageSearchGrade.value,
    currentPage: 1,
    pageSize: managePageInfo.value.pageSize,
    subscribersType: manageSearchSubscribersType.value,
    type: manageSearchType.value,
  });
};

getAccessInfo({
  name: manageSearchName.value,
  subscribers: manageSearchGrade.value,
  currentPage: managePageInfo.value.currentPage,
  pageSize: managePageInfo.value.pageSize,
  subscribersType: manageSearchSubscribersType.value,
  type: manageSearchType.value,
});

const handleSizeChange = async (val: number) => {
  managePageInfo.value.pageSize = val;
  getAccessInfo({
    name: manageSearchName.value,
    subscribers: manageSearchGrade.value,
    currentPage: managePageInfo.value.currentPage,
    pageSize: managePageInfo.value.pageSize,
    subscribersType: manageSearchSubscribersType.value,
    type: manageSearchType.value,
  });
};
const handleCurChange = async (val: number) => {
  managePageInfo.value.currentPage = val;
  getAccessInfo({
    name: manageSearchName.value,
    subscribers: manageSearchGrade.value,
    currentPage: managePageInfo.value.currentPage,
    pageSize: managePageInfo.value.pageSize,
    subscribersType: manageSearchSubscribersType.value,
    type: manageSearchType.value,
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

//同步子组件的dialogVisible值
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
  manageSearchName.value = "";
  manageSearchGrade.value = "";
  manageSearchSubscribersType.value = "";
  manageSearchType.value = "";
  if (props) {
    getAccessInfo({
      currentPage: managePageInfo.value.currentPage,
      pageSize: managePageInfo.value.pageSize,
    });
  }
};

const deleteAccess = (row: any) => {
  if (getGrade.value >= (row.subscribers as number) && roleId.value != 3) {
    ElMessage({
      type: "warning",
      message: "您还未获得该权限哦！",
    });
    return;
  }
  ElMessageBox.confirm("确认要删除该课程吗", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
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
          name: manageSearchName.value,
          subscribers: manageSearchGrade.value,
          currentPage: managePageInfo.value.currentPage,
          pageSize: managePageInfo.value.pageSize,
          subscribersType: manageSearchSubscribersType.value,
          type: manageSearchType.value,
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
    watchScoreRef.value?.scoreTableId(
      row.subscribers,
      row.id,
      getGrade.value,
      roleId.value
    );
  } else {
    interviewDialogVisible.value = true;
    watchInterviewRef.value?.interviewId(
      row.subscribers,
      row.id,
      getGrade.value,
      roleId.value,
      row.subscribersType
    );
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

.btn {
  margin: 2px;
}
</style>

<template>
  <div class="container">
    <AddAccessInfo
      :dialogVisible="accessDialogVisible"
      @addAlert="accessHandle"
      @update_event="updateEvent"
    />
    <AddScoreInfo
      :dialogVisible="scoreDialogVisible"
      @addAlert="scoreHandle"
      :id="addScoreID"
      ref="addScoreRef"
    />
    <el-form :inline="true" :model="searchKeys">
      <el-form-item label="考核名称"
        ><el-input v-model="searchKey" placeholder="考核名称" clearable
      /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchAccess">搜索</el-button>
        <el-button type="warning" @click="resetInfo">重置</el-button>
        <el-button type="success" @click="addAlert">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="accessInfo"
      :border="parentBorder"
      style="width: 100%"
      ref="tableRef"
      v-loading="isLoading"
    >
      <el-table-column type="expand">
        <template #default="props">
          <!-- <div>{{ props.row }}</div> -->
          <div class="accessInfo">
            <h3>
              成绩<el-button
                style="margin-left: 10px; width: 55px; height: 30px"
                type="success"
                @click="scoreAlert(props.row.id)"
                >添加</el-button
              >
            </h3>
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
              <el-table-column label="姓名" prop="name" />
              <el-table-column label="代码" prop="code" />
              <el-table-column label="完成度" prop="final" />
              <el-table-column label="基础知识" prop="base" />
              <el-table-column label="平时分" prop="usual" />
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
import AddScoreInfo from "@/components/AddScoreInfo/index.vue";
import {
  deleteAccessService,
  getAllAccessService,
  getUserInfoById,
} from "~/service/user";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { storeToRefs } from "pinia";
const tableRef = ref();
import type { AccessResInfoType } from "~/types/Access";
definePageMeta({
  layout: "manag",
});

const addScoreRef = ref<InstanceType<typeof AddScoreInfo>>();

const AccessPageInfoStore = useAccessPageInfoStore();
const isLoading = ref(false);
const accessDialogVisible = ref(false);
const scoreDialogVisible = ref(false);
const addScoreID = ref();
const { pageInfo, searchKey } = storeToRefs(AccessPageInfoStore);

const accessInfo = ref<Array<AccessResInfoType>>([]);

// watch(accessInfo.value, (newValue) => {
//   console.log(newValue);
// });
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
    }
  }
  pageInfo.value.currentPage = accessInfoRes.data.value.data.current;
  pageInfo.value.pageSize = accessInfoRes.data.value.data.size;
  pageInfo.value.total = accessInfoRes.data.value.data.total;
  isLoading.value = false;
  console.log(accessInfo.value);
};

const resetInfo = () => {
  pageInfo.value.currentPage = 1;
  searchKey.value = "";
  getAccessInfo({
    keyword: "",
    currentPage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
  });
};

const searchAccess = async () => {
  if (searchKey.value == "") {
    ElMessage({
      type: "warning",
      message: "请输入关键词",
    });
  } else {
    pageInfo.value.currentPage = 1;
    const accessInfoRes = await getAllAccessService({
      name: searchKey.value,
      nodePage: 1,
      pageSize: pageInfo.value.pageSize,
    });
    accessInfo.value = accessInfoRes.data.value.data.records;
    pageInfo.value.currentPage = accessInfoRes.data.value.data.current;
    pageInfo.value.pageSize = accessInfoRes.data.value.data.size;
    pageInfo.value.total = accessInfoRes.data.value.data.total;
  }
};

const getScore = (row: any, expandedRows: any) => {
  const isExpanded = expandedRows.includes(row);
  console.log(expandedRows);
  //判断开启下拉和关闭下拉
  if (!isExpanded) {
    return;
  }
  let sonTable = [
    {
      name: "张三",
      code: 0,
      final: 0,
      base: 0,
      usual: 0,
      comments: [
        {
          name: "person1",
          commentInfo: "这是评价这是评价这是评价这是评价这是评价",
        },
        {
          name: "person1",
          commentInfo: "这是评价这是评价这是评价这是评价这是评价",
        },
        {
          name: "person1",
          commentInfo: "这是评价这是评价这是评价这是评价这是评价",
        },
        {
          name: "person1",
          commentInfo: "这是评价这是评价这是评价这是评价这是评价",
        },
      ],
    },
  ];

  // let index = accessInfo.value?.findIndex((obj) => obj.id === row.id);

  row.sonTable = markRaw(sonTable);
};

getAccessInfo({
  keyword: searchKey.value,
  currentPage: pageInfo.value.currentPage,
  pageSize: pageInfo.value.pageSize,
});

const handleSizeChange = async (val: number) => {
  pageInfo.value.pageSize = val;
  getAccessInfo({
    keyword: searchKey.value,
    currentPage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
  });
};
const handleCurChange = async (val: number) => {
  pageInfo.value.currentPage = val;
  getAccessInfo({
    keyword: searchKey.value,
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

const addAlert = () => {
  accessDialogVisible.value = !accessDialogVisible.value;
};
const scoreAlert = (id: number) => {
  addScoreID.value = id;
  scoreDialogVisible.value = !scoreDialogVisible.value;
  console.log(id);
  addScoreRef.value?.postId(id);
};

const accessHandle = (props: boolean) => {
  accessDialogVisible.value = props;
};

const scoreHandle = (props: boolean) => {
  scoreDialogVisible.value = props;
};
const updateEvent = (props: boolean) => {
  searchKey.value = "";
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
          keyword: searchKey.value,
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

//添加成绩
const addScoreAlert = () => {};
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

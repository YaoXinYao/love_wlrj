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
      @update_score_event="updateScoreEvent"
      ref="addScoreRef"
    />
    <el-form :inline="true" :model="manageSearchKeys">
      <el-form-item label="考核名称"
        ><el-input v-model="manageSearchKey" placeholder="考核名称" clearable
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
      @expand-change="onExpand"
      :row-key="handleRow"
      :expand-row-keys="rowKeyArr"
    >
      <el-table-column type="expand">
        <template #default="props">
          <!-- <div>{{ props.row }}</div> -->
          <div class="accessInfo">
            <h3>
              成绩<el-button
                style="margin-left: 10px; width: 55px; height: 30px"
                type="success"
                @click="scoreAlert(props.row)"
                >添加</el-button
              >
            </h3>
            <el-table
              :data="props.row.scoreList"
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
              <el-table-column label="学号" prop="studentId" />
              <el-table-column
                v-for="(item, index) in props.row.templates"
                :key="index"
                :label="item.name"
                :prop="item.name"
              />

              <el-table-column label="操作"
                ><el-button type="warning" @click="updateScore(props.row)"
                  >修改</el-button
                >
                <el-button type="danger" @click="deleteScore(props.row)"
                  >删除</el-button
                ></el-table-column
              >
            </el-table>
            <div class="pagination">
              <el-pagination
                v-model:current-page="props.row.managePageInfo.pageIndex"
                v-model:page-size="props.row.managePageInfo.allPage"
                :page-sizes="[5, 10, 15, 20]"
                small
                layout="total, sizes, prev, pager, next, jumper"
                :total="props.row.managePageInfo.allCount"
                @size-change="handleScoreSizeChange"
                @current-change="handleScoreCurrentChange"
              />
            </div>
          </div>
        </template>
      </el-table-column>
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
import { reactive, ref } from "vue";
import AddScoreInfo from "@/components/AddScoreInfo/index.vue";
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
const addScoreNeedInfo = ref<AccessResInfoType>();
const addScoreRef = ref<InstanceType<typeof AddScoreInfo>>();
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

const onExpand = async (row: any, expandedRows: any) => {
  if (!expandedRows.includes(row)) {
    return;
  }

  let managePageInfo = { pageIndex: 1, allPage: 0, allCount: 0, size: 0 };
  row.managePageInfo = managePageInfo;
  let ids = handleRow(row);
  let index = rowKeyArr.value?.indexOf(ids);
  if (index === -1) {
    rowKeyArr.value?.push(ids);
  } else {
    rowKeyArr.value?.splice(index, 1);
  }

  let templateRes = await getTemplateService(row.id);
  if (templateRes.data.value.code == 400006) {
    return;
  }

  let scoreInfoRes = await getScoreByAccessService({
    nodePage: 1,
    pageSize: 2,
    pId: row.id,
  });

  if (scoreInfoRes.data.value.code == 20000) {
    let { pageIndex, allPage, allCount, size } = scoreInfoRes.data.value.data;
    managePageInfo = { pageIndex, allPage, allCount, size };
    row.managePageInfo = managePageInfo;
    const list = scoreInfoRes.data.value.data.list;
    let scoreList = new Array(list.length);
    row.templates = templateRes.data.value.data.types;

    for (let i = 0; i < list.length; i++) {
      let scores = list[i].scores;
      let obj: { [x: string]: string } = {};
      obj.id = list[i].id;
      for (let j = 0; j < scores.length; j++) {
        obj[scores[j].name] = scores[j].score;
      }
      let studentNameRes = await getUserInfoById(list[i].studentId);

      obj["name"] = studentNameRes.data.value.data.userName;
      obj["studentId"] = studentNameRes.data.value.data.userAccount;
      scoreList.push(obj);
    }
    row.scoreList = scoreList;
  } else {
    return null;
  }
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
const childBorder = ref(false);

const addAlert = () => {
  accessDialogVisible.value = !accessDialogVisible.value;
};
const scoreAlert = (props: AccessResInfoType) => {
  addScoreNeedInfo.value = props;

  scoreDialogVisible.value = !scoreDialogVisible.value;
  addScoreRef.value?.postId(props);
};

const accessHandle = (props: boolean) => {
  accessDialogVisible.value = props;
};

const scoreHandle = (props: boolean) => {
  scoreDialogVisible.value = props;
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

const updateScoreEvent = (props: boolean) => {
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

const handleScoreSizeChange = (val: number) => {
  console.log(val);
};
const handleScoreCurrentChange = (val: number) => {
  console.log(val);
};

const deleteScore = (row: any) => {
  console.log(row);
};

const updateScore = (row: any) => {
  console.log(row);
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

.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
</style>

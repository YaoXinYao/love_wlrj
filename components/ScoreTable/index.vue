<template>
  <ClientOnly>
    <AddScoreInfo
      @addAlert="scoreHandle"
      @add_score_event="addScoreEvent"
      ref="addScoreRef"
    />
    <!-- <UpdateScoreInfo
      @updateAlert="scoreUpdateHandle"
      @add_score_event="updateScoreEvent"
      ref="updateScoreRef"
    /> -->

    <el-dialog
      v-model="dialogVisible"
      draggable
      width="max-content"
      @closed="changeState"
    >
      <template #header>
        <div class="my-header">
          <h3>成绩列表</h3>
          <el-button
            type="success"
            @click="addScoreBtn"
            style="margin-right: 20px"
            v-if="isHaveAuthority"
            >添加</el-button
          >
        </div>
      </template>

      <el-table :data="scoreListData" class="accessScore" :fit="true">
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="学号" prop="studentId" />
        <el-table-column
          v-for="(item, index) in templates"
          :key="index"
          :label="item.name"
          :prop="item.name"
        />

        <el-table-column label="操作" v-if="isHaveAuthority">
          <template #default="scope"
            ><div>
              <!-- <el-button
                size="small"
                type="warning"
                @click="updateScore(scope.row)"
                >修改</el-button
              > -->
              <el-button
                size="small"
                type="danger"
                @click="deleteScore(scope.row.id)"
                >删除</el-button
              >
            </div></template
          ></el-table-column
        >
      </el-table>
      <div class="pagination">
        <el-pagination
          v-show="managePageInfo.allCount"
          v-model:current-page="managePageInfo.pageIndex"
          v-model:page-size="managePageInfo.size"
          :page-sizes="[5, 10, 15]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="managePageInfo.allCount"
          @size-change="handleScoreSizeChange"
          @current-change="handleScoreCurrentChange"
        />
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  deleteScoreService,
  getAccessInfo,
  getScoreByAccessService,
  getTemplateService,
  getUserInfoById,
} from "~/service/user";
import AddScoreInfo from "@/components/AddScoreInfo/index.vue";
import UpdateScoreInfo from "@/components/UpdateScoreInfo/index.vue";

const props = defineProps(["id", "dialogVisible", "getGrade", "roleId"]);
const emit = defineEmits(["scoreAlert"]);
let dialogVisible = ref(false);
const addScoreRef = ref<InstanceType<typeof AddScoreInfo>>();
const updateScoreRef = ref<InstanceType<typeof UpdateScoreInfo>>();
const scoreHandle = (props: boolean) => {
  scoreDialogVisible.value = props;
};

const scoreDialogVisible = ref(false);
const scoreUpdateDialogVisible = ref(false);
const isHaveAuthority = ref<boolean>(false);
const scoreListData = ref();
let pId = ref(-1);
const changeState = () => {
  dialogVisible.value = false;
};

let managePageInfo = ref({
  pageIndex: 1,
  allPage: 0,
  allCount: 0,
  size: 5,
});
let templates: any;

watch(toRef(props, "dialogVisible"), (newValue, oldValue) => {
  dialogVisible.value = newValue;
});

watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("scoreAlert", dialogVisible.value);
});

watch(pId, async (newValue) => {
  pId.value = newValue;
  if (newValue != -1) {
    let accessInfoRes = await getAccessInfo(pId.value);
    if (accessInfoRes.data.value.code == 20000) {
      if (
        (accessInfoRes.data.value.data.subscribers as number) <=
          props.getGrade &&
        props.roleId != 3
      ) {
        isHaveAuthority.value = false;
      } else {
        isHaveAuthority.value = true;
      }
    }
    getInfo();
  }
});

const addScoreBtn = () => {
  addScoreRef.value?.postId(pId.value);
  addScoreRef.value?.changes(true);
};

const getInfo = async () => {
  let templateRes = await getTemplateService(pId.value);
  if (templateRes.data.value.code == 400006) {
    return;
  }
  let scoreInfoRes = await getScoreByAccessService({
    nodePage: managePageInfo.value.pageIndex,
    pageSize: managePageInfo.value.size,
    pId: pId.value,
  });
  if (scoreInfoRes.data.value.code == 20000) {
    let { pageIndex, allPage, allCount, size } = scoreInfoRes.data.value.data;
    managePageInfo.value = { pageIndex, allPage, allCount, size };
    const list = scoreInfoRes.data.value.data.list;
    let scoreList = new Array(list.length);
    templates = templateRes.data.value.data.types;
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
    scoreListData.value = scoreList;
  } else {
    return null;
  }
};

const handleScoreSizeChange = (val: number) => {
  managePageInfo.value.size = val;
  getInfo();
};
const handleScoreCurrentChange = (val: number) => {
  managePageInfo.value.pageIndex = val;
  getInfo();
};

const deleteScore = async (id: any) => {
  ElMessageBox.confirm("确认要删除该课程吗", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      let deleteScoreRes = await deleteScoreService([id]);
      if (deleteScoreRes.data.value.code == 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getInfo();
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

const updateScore = (row: any) => {
  updateScoreRef.value?.postTemplate(row, pId.value);
  updateScoreRef.value?.updateAlertchanges(true);
};

function scoreTableId(id: number) {
  pId.value = id;
}

const addScoreEvent = (prop: boolean) => {
  if (prop) {
    getInfo();
  }
};

defineExpose({ scoreTableId });
</script>

<style lang="scss" scoped>
.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  h3 {
    font-size: 20px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

<template>
  <ClientOnly>
    <AddScoreInfo
      @addAlert="scoreHandle"
      @update_score_event="updateScoreEvent"
      ref="addScoreRef"
    />

    <el-dialog
      v-model="dialogVisible"
      title="成绩"
      draggable
      :closed="changeState"
    >
      <div>
        <el-button type="success" @click="addScoreBtn">添加</el-button>
      </div>
      <el-table :data="scoreListData" class="accessScore">
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="学号" prop="studentId" />
        <el-table-column
          v-for="(item, index) in templates"
          :key="index"
          :label="item.name"
          :prop="item.name"
        />

        <el-table-column label="操作">
          <template #default="scope"
            ><el-button type="warning" @click="updateScore(scope.row.id)"
              >修改</el-button
            >
            <el-button type="danger" @click="deleteScore(scope.row.id)"
              >删除</el-button
            ></template
          ></el-table-column
        >
      </el-table>
      <div class="pagination">
        <el-pagination
          v-show="managePageInfo.allCount"
          v-model:current-page="managePageInfo.pageIndex"
          v-model:page-size="managePageInfo.size"
          :page-sizes="[5, 10, 15]"
          small
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
  getScoreByAccessService,
  getTemplateService,
  getUserInfoById,
} from "~/service/user";
import AddScoreInfo from "@/components/AddScoreInfo/index.vue";

const props = defineProps(["id", "dialogVisible"]);
const emit = defineEmits(["scoreAlert"]);
let dialogVisible = ref(false);
const addScoreRef = ref<InstanceType<typeof AddScoreInfo>>();
const scoreHandle = (props: boolean) => {
  scoreDialogVisible.value = props;
};
const scoreDialogVisible = ref(false);
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

watch(pId, (newValue) => {
  console.log(newValue);
  pId.value = newValue;
  if (newValue != -1) {
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
    console.log(scoreInfoRes.data.value.data);

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
  console.log(id);
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
  console.log(row);
};

function scoreTableId(id: number) {
  pId.value = id;
}

const updateScoreEvent = (prop: boolean) => {
  if (prop) {
    getInfo();
  }
};

defineExpose({ scoreTableId });
</script>

<style lang="scss" scoped></style>

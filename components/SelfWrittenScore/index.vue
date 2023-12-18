<!-- 笔试类型考核组件 -->
<template>
  <div class="selfScore">
    <el-table
      empty-text="暂无数据"
      :show-overflow-tooltip="true"
      :data="writtenScoreList"
      :border="parentBorder"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="accessInfo">
            <h3>成绩</h3>
            <el-table
              :data="props.row.scoreList"
              :border="childBorder"
              class="accessScore"
            >
              <el-table-column
                v-for="(item, index) in props.row.template"
                :key="index"
                :label="item.name"
                :prop="item.name"
              />
            </el-table>
          </div>
          <div class="accessInfo" v-if="props.row.interviewList">
            <h3>评语</h3>
            <div>
              <div v-if="!props.row.interviewList.length">暂无数据</div>
              <div
                class="commentItem"
                v-for="(c, index) in props.row.interviewList"
                :key="index"
                v-if="props.row.interviewList.length"
              >
                <span class="reviewer"
                  ><img src="@/assets/image/评价.png" alt="" />评语{{
                    index + 1
                  }}</span
                >
                <p>{{ c.comment }}</p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="考核名称" prop="plan" fixed />
      <el-table-column label="考核类型" prop="type">
        <template #default="scope"
          ><el-tag size="large">{{ scope.row.type }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="考核类别" prop="typeId">
        <template #default="scope"
          ><el-tag size="large" type="success">{{
            scope.row.typeId
          }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="考核时间" prop="deadline" />
      <el-table-column label="补充" prop="additional" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[5, 10, 15]"
        :layout="paginationLayout"
        :total="pageInfo.total"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAccessInfo,
  getInterviewService,
  getScoreByAccessService,
  getTemplateService,
} from "~/service/access";
import { debounce } from "lodash";
import type { AccessPageInfoType, AccessResInfoType } from "~/types/Access";
const parentBorder = ref(true);
const childBorder = ref(false);
let writtenScoreList = ref<Array<AccessResInfoType>>([]);
const props = defineProps(["userId"]);
let userId = ref();
const windowWidth = ref(window.innerWidth);
let paginationLayout = ref<string>("total, sizes, prev, pager, next, jumper");
userId.value = props.userId;
const pageInfo = ref<AccessPageInfoType>({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});

watch(
  () => props.userId,
  (newValue) => {
    userId.value = newValue;
    getInfo();
  }
);

onMounted(() => {
  getInfo();
  if (window.innerWidth <= 800) {
    paginationLayout.value = "total, prev, pager, next";
  } else {
    paginationLayout.value = "total, sizes, prev, pager, next, jumper";
  }
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  writtenScoreList.value = [];
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

const handleSizeChange = (val: number) => {
  pageInfo.value.pageSize = val;
  getInfo();
};

const handleCurrentChange = (val: number) => {
  pageInfo.value.currentPage = val;
  getInfo();
};

//获取笔试信息
const getInfo = async () => {
  writtenScoreList.value = [];
  let scoreInfoRes = await getScoreByAccessService({
    nodePage: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    studentId: userId.value,
  });

  let scoreInfo = scoreInfoRes.data.value;
  let scoreInfoData = scoreInfo.data.list;
  if (scoreInfo.code == 20000) {
    pageInfo.value.currentPage = scoreInfo.data.pageIndex;
    pageInfo.value.pageSize = scoreInfo.data.size;
    pageInfo.value.total = scoreInfo.data.allCount;
    for (let i = 0; i < scoreInfoData.length; i++) {
      let scoreList = new Array(scoreInfoData.length);
      let obj: { [x: string]: string } = {};
      obj.id = scoreInfoData[i].id;
      let getTemplateRes = await getTemplateService(scoreInfoData[i].pid);
      let studyPlanRes = await getAccessInfo(scoreInfoData[i].pid);

      let interviewList = null;
      if (scoreInfoData[i].type == "面评") {
        let getInterviewRes = await getInterviewService({
          id: userId.value,
          pId: scoreInfoData[i].pid,
        });

        interviewList = getInterviewRes.data.value.data;
      }

      let studyPlan = studyPlanRes.data.value.data;
      let scores = scoreInfoData[i].scores;

      for (let j = 0; j < scores.length; j++) {
        obj[scores[j].name] = scores[j].score;
      }
      scoreList.push(obj);
      studyPlan.scoreList = scoreList;
      studyPlan.template = getTemplateRes.data.value.data.types;
      studyPlan.interviewList = interviewList;

      writtenScoreList.value.push(studyPlan);
    }
  } else {
    return;
  }
};
</script>

<style lang="scss" scoped>
.accessInfo {
  width: 90%;
  padding-left: 10%;
  margin-top: 5px;

  .accessScore {
    margin-left: 8px;
  }

  h3 {
    margin: 10px;
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
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>

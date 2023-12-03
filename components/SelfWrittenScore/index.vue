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
      <el-table-column label="考核名称" prop="plan" />
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
        v-model:current-page="selfWrittenPageInfo.currentPage"
        v-model:page-size="selfWrittenPageInfo.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="selfWrittenPageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
const parentBorder = ref(true);
const childBorder = ref(false);
let writtenScoreList = ref<Array<AccessResInfoType>>([]);
import {
  getAccessInfo,
  getInterviewService,
  getScoreByAccessService,
  getTemplateService,
} from "~/service/user";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { useHomestore } from "~/store/home";
import type { AccessResInfoType, ScorePageInfoListType } from "~/types/Access";
const accessPageInfoStore = useAccessPageInfoStore();
let { selfWrittenPageInfo, selfSearchKey } = storeToRefs(accessPageInfoStore);
//获取当前登录用户信息
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);

let userId = userinfo.value.userId;

onMounted(async () => {
  getInfo();
});
const handleSizeChange = (val: number) => {
  selfWrittenPageInfo.value.pageSize = val;
  getInfo();
};

const handleCurrentChange = (val: number) => {
  selfWrittenPageInfo.value.currentPage = val;
  getInfo();
};

const getInfo = async () => {
  writtenScoreList.value = [];
  let scoreInfoRes = await getScoreByAccessService({
    nodePage: selfWrittenPageInfo.value.currentPage,
    pageSize: selfWrittenPageInfo.value.pageSize,
    studentId: userId,
  });

  let scoreInfo = scoreInfoRes.data.value;
  let scoreInfoData = scoreInfo.data.list;

  if (scoreInfo.code == 20000) {
    selfWrittenPageInfo.value.currentPage = scoreInfo.data.pageIndex;
    selfWrittenPageInfo.value.pageSize = scoreInfo.data.size;
    selfWrittenPageInfo.value.total = scoreInfo.data.allCount;
    for (let i = 0; i < scoreInfoData.length; i++) {
      let scoreList = new Array(scoreInfoData.length);
      let obj: { [x: string]: string } = {};
      obj.id = scoreInfoData[i].id;
      let getTemplateRes = await getTemplateService(scoreInfoData[i].pid);
      let studyPlanRes = await getAccessInfo(scoreInfoData[i].pid);
      let interviewList = null;
      if (scoreInfoData[i].type == "面评") {
        let getInterviewRes = await getInterviewService({
          id: userId,
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

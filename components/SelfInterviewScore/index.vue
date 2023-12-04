<template>
  <div class="selfScore">
    <el-table
      empty-text="暂无数据"
      :show-overflow-tooltip="true"
      :data="interviewList"
      :border="parentBorder"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="interviewList">
            <span class="nullSpan" v-show="!props.row.interviewList"
              >暂无数据</span
            >
            <div
              class="commentItem"
              v-show="props.row.interviewList"
              v-for="(c, index) in props.row.interviewList"
              :key="index"
            >
              <span class="reviewer"
                ><img src="@/assets/image/评价.png" alt="" />评语{{ index + 1
                }}<span class="interviewTime">{{ c.createTime }}</span></span
              >
              <p>
                {{ c.comment }}
              </p>
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
        v-model:current-page="selfInterviewPageInfo.currentPage"
        v-model:page-size="selfInterviewPageInfo.pageSize"
        :page-sizes="[5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="selfInterviewPageInfo.total"
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
let interviewScoreList = ref<Array<AccessResInfoType>>([]);
import {
  getAccessInfo,
  getInterviewService,
  getUserInterviewService,
} from "~/service/user";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
import { useHomestore } from "~/store/home";
import type { AccessResInfoType } from "~/types/Access";
const accessPageInfoStore = useAccessPageInfoStore();
let { selfInterviewPageInfo } = storeToRefs(accessPageInfoStore);
//获取当前登录用户信息
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
let userId = userinfo.value.userId;

const interviewList = ref<Array<AccessResInfoType>>([]);

onMounted(async () => {
  getInfo();
});
const handleSizeChange = (val: number) => {
  selfInterviewPageInfo.value.pageSize = val;
  getInfo();
};

const handleCurrentChange = (val: number) => {
  selfInterviewPageInfo.value.currentPage = val;
  getInfo();
};

const getInfo = async () => {
  interviewScoreList.value = [];
  let scoreInfoRes = await getUserInterviewService({
    nodePage: selfInterviewPageInfo.value.currentPage,
    pageSize: selfInterviewPageInfo.value.pageSize,
    id: userId,
  });

  console.log(scoreInfoRes.data.value);

  if (scoreInfoRes.data.value.code == 20000) {
    const { pageIndex, size, allCount } = scoreInfoRes.data.value.data;
    selfInterviewPageInfo.value.currentPage = pageIndex;
    selfInterviewPageInfo.value.pageSize = size;
    selfInterviewPageInfo.value.total = allCount;
    let pIdList = scoreInfoRes.data.value.data.list;
    for (let i = 0; i < pIdList.length; i++) {
      let InterviewListItem = await getAccessInfo(pIdList[i]);
      let interviewItem = await getInterviewService({
        id: userId,
        pId: pIdList[i],
      });
      interviewList.value[i] = InterviewListItem.data.value.data;
      interviewList.value[i].interviewList = interviewItem.data.value.data;
    }
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

.interviewList {
  display: inline-block;
  width: 90%;
  margin-left: 5%;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>

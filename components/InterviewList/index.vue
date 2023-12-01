import { number } from 'echarts';
<template>
  <ClientOnly>
    <el-dialog
      v-model="dialogVisible"
      title="评语"
      draggable
      :closed="changeState"
    >
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
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
              <p>{{ c.comment }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="userName" />
        <el-table-column label="班级" prop="userClass" />
        <el-table-column label="学号" prop="userAccount" />
      </el-table>
      <div class="pagination">
        <el-pagination
          v-show="pageInfo.total"
          style="margin-top: 20px"
          v-model:current-page="pageInfo.pageNo"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :small="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurChange"
        />
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import { number } from "echarts";
import { getInterviewService, searchUserervice } from "~/service/user";
import type { UserAllInfoType } from "~/types/User";

const props = defineProps(["id", "dialogVisible"]);
const emit = defineEmits(["interviewAlert"]);
let gradeNumber = ref(-1);
let id = ref(-1);
let userList = ref<Array<UserAllInfoType>>([]);
let dialogVisible = ref(false);
const pageInfo = reactive({
  pageNo: 1,
  pageSize: 5,
  total: 0,
});
const changeState = () => {
  dialogVisible.value = false;
};

watch(toRef(props, "dialogVisible"), (newValue, oldValue) => {
  dialogVisible.value = newValue;
});

watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("interviewAlert", dialogVisible.value);
});

watch(id, (newValue) => {
  getGradeUser(gradeNumber.value);
});

const getGradeUser = async (grade: number) => {
  let userListRes = await searchUserervice({ ...pageInfo, userGrade: grade });
  console.log(userListRes);

  if (userListRes.data.value.code == 20000) {
    let { current, total, size } = userListRes.data.value.data;
    pageInfo.pageNo = current;
    pageInfo.pageSize = size;
    pageInfo.total = total;
    userList.value = userListRes.data.value.data.records;
    for (let i = 0; i < userList.value.length; i++) {
      let interviewItemRes = await getInterviewService({
        id: userList.value[i].userId,
        pId: id.value,
      });
      console.log(userList.value[i].userId, id.value);

      console.log(interviewItemRes);

      if (interviewItemRes.data.value.code == 20000) {
        userList.value[i].interviewList = interviewItemRes.data.value.data;
      } else if (interviewItemRes.data.value.code == 400006) {
        userList.value[i].interviewList = null;
      }
    }
  } else {
    ElMessage({
      type: "error",
      message: "获取人员失败",
    });
  }
};

const handleSizeChange = (val: number) => {
  pageInfo.pageSize = val;
  getGradeUser(gradeNumber.value);
};

const handleCurChange = (val: number) => {
  pageInfo.pageNo = val;
  getGradeUser(gradeNumber.value);
};

const deleteInterview = (id: number) => {
  console.log(id);
};
//暴露方法接收试卷id和学生id
function interviewId(grade: number, pId: number) {
  id.value = pId;
  gradeNumber.value = grade;
}
defineExpose({ interviewId });
</script>

<style lang="scss" scoped>
.nullSpan {
  display: inline-block;
  width: 100%;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
  color: rgb(54, 149, 215);
}

.commentItem {
  font-family: "Times New Roman", Times, serif;

  border-bottom: 1px dashed #ccc;
  margin-left: 40px;

  &:hover {
    background-color: aliceblue;
  }

  .reviewer {
    display: flex;
    align-items: center;
    padding-top: 5px;
    font-size: 16px;
    color: $groupColor;
    height: 30px;

    img {
      width: 20px;
    }
    .interviewTime {
      display: inline-block;
      font-size: 13px;
      margin-left: 5px;
      color: #ccc !important;
    }
  }
  p {
    height: auto;
    line-height: 25px;
    font-size: 13px;
  }
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>

<!-- 后台面试成绩组件 -->
<template>
  <ClientOnly>
    <el-dialog
      v-model="addInterviewDialogFormVisible"
      title="添加面评"
      @closed="changeAddInterviewState"
    >
      <el-form :model="form" ref="addInterviewRef">
        <el-form-item
          label="面评对象"
          prop="studentId"
          :rules="[
            { required: true, message: '面评对象不能为空', trigger: 'blur' },
          ]"
        >
          <el-select
            v-model="form.studentId"
            clearable
            filterable
            remote
            :multiple="false"
            :remote-method="searchUserByGrade"
            :loading="loading"
            placeholder="请输入关键字搜索用户"
          >
            <el-option
              v-for="item in options"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="面评内容"
          prop="content"
          :rules="[
            { required: true, message: '面评内容不能为空', trigger: 'blur' },
          ]"
        >
          <el-input
            type="textarea"
            v-model="form.content"
            autocomplete="off"
            maxlength="200"
            show-word-limit
            placeholder="至多200字"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addInterviewDialogFormVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="addInterview(addInterviewRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" draggable @closed="changeState">
      <template #header>
        <div class="my-header">
          <h3>面评列表</h3>
          <el-button
            type="success"
            @click="addInterviewBtn"
            style="margin-right: 20px"
            v-if="gradeNumber < userGrade || userRole == 3"
            >添加</el-button
          >
        </div>
      </template>
      <el-table
        :data="userList"
        style="width: 100%"
        :row-key="rowKey"
        :expand-row-keys="expandRowKeys"
        @expand-change="onExpand"
      >
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
                }}<span class="interviewTime"
                  >{{ c.createTime
                  }}<el-icon
                    class="deleteInterview"
                    @click="deleteInterview(c.id, props.row)"
                    v-if="gradeNumber < userGrade || userRole == 3"
                    ><Delete /></el-icon></span
              ></span>
              <p>
                {{ c.comment }}
              </p>
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
import { searchUserByGradeService, searchUserervice } from "~/service/user";
import {
  addInterviewService,
  deleteInterviewService,
  getInterviewService,
} from "~/service/access";
import type { UserAllInfoType } from "~/types/User";
import { Delete } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
const props = defineProps(["id", "dialogVisible"]);
const emit = defineEmits(["interviewAlert"]);
let gradeNumber = ref(-1);
let id = ref(-1);
let userGrade = ref<number>(0);
let userRole = ref<number>(1);
const options = ref<Array<UserAllInfoType>>([]);
const addInterviewRef = ref<FormInstance>();
let userList = ref<Array<UserAllInfoType>>([]);
let dialogVisible = ref(false);
const addInterviewDialogFormVisible = ref(false);
const loading = ref(false);
function rowKey(row: any) {
  return row.userId + "";
}
const expandRowKeys = ref<string[]>([]);
const form = reactive<{ content: string; studentId: number | string }>({
  content: "",
  studentId: "",
});

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

      if (interviewItemRes.data.value.code == 20000) {
        userList.value[i].interviewList = interviewItemRes.data.value.data;
      } else {
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

const deleteInterview = async (interviewId: number, row: any) => {
  ElMessageBox.confirm("你确定要删除该消息吗？")
    .then(async () => {
      let deleteRes = await deleteInterviewService([interviewId]);

      if (deleteRes.data.value.code == 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        let index = -1;
        for (let i = 0; i < userList.value.length; i++) {
          if (userList.value[i].userId == row.userId) {
            index = i;
          }
        }

        let interviewItemRes = await getInterviewService({
          id: row.userId,
          pId: id.value,
        });
        if (interviewItemRes.data.value.code == 20000) {
          userList.value[index].interviewList =
            interviewItemRes.data.value.data;
        } else {
          userList.value[index].interviewList = null;
        }
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

const addInterviewBtn = () => {
  addInterviewDialogFormVisible.value = true;
};

//搜索用户
const searchUserByGrade = async (val: string) => {
  if (val.trim() != "") {
    loading.value = true;

    let res = await searchUserByGradeService(gradeNumber.value, val);
    if (res.data.value.code == 20000) {
      options.value = res.data.value.data;
    }
    loading.value = false;
  }
};
//添加面评
const addInterview = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (vaild) => {
    if (vaild) {
      let addInterviewRes = await addInterviewService({
        content: form.content,
        PId: id.value,
        studentId: form.studentId,
      });
      if (addInterviewRes.data.value.code == 20000) {
        ElMessage({
          type: "success",
          message: "添加成功",
        });
        addInterviewDialogFormVisible.value = false;
        formEl.resetFields();
        getGradeUser(gradeNumber.value);
      } else {
        ElMessage({
          type: "error",
          message: "添加失败",
        });
      }
    } else {
      ElMessage({
        type: "warning",
        message: "请完善表单",
      });
    }
  });
};

const onExpand = (row: any) => {
  let id = rowKey(row);
  let index = expandRowKeys.value?.indexOf(rowKey(row));
  if (index == -1) {
    expandRowKeys.value?.push(id);
  } else {
    expandRowKeys.value?.splice(index, 1);
  }
};
const changeAddInterviewState = () => {
  addInterviewDialogFormVisible.value = false;
};

//暴露方法接收试卷id和学生id
function interviewId(
  grade: number,
  pId: number,
  userGradeProp: number,
  userRoleProp: number
) {
  id.value = pId;
  gradeNumber.value = grade;
  userGrade.value = userGradeProp;
  userRole.value = userRoleProp;
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
  cursor: pointer;

  &:hover {
    background-color: aliceblue;

    .deleteInterview {
      opacity: 1;
    }
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

.deleteInterview {
  font-size: 16px;
  color: red;
  margin-left: 10px;
  line-height: 100%;
  opacity: 0;
  cursor: pointer;
  transition: all 0.2s;
}

.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  h3 {
    font-size: 20px;
  }
}
</style>

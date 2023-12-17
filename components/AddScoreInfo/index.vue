<!-- 添加成绩的组件 -->
<template>
  <div class="">
    <ClientOnly>
      <el-dialog
        v-model="dialogVisible"
        title="添加考核成绩"
        :width="dialogWidth"
        draggable
        @closed="changeState"
      >
        <el-form :model="scoreInfo" ref="scoreInfoRef">
          <el-form-item
            label="姓名"
            prop="studentId"
            :rules="[
              { required: true, message: '内容不可为空', trigger: 'blur' },
            ]"
          >
            <el-select
              v-model="scoreInfo.studentId"
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
            v-for="(t, index) in types.data"
            :label="t.name + '(' + t.rate * 100 + '%)'"
            :rules="[
              { required: true, message: '内容不可为空', trigger: 'blur' },
            ]"
          >
            <el-input-number
              v-model="t.score"
              :precision="2"
              :step="0.1"
              :max="1000"
              :min="0"
              :value-on-clear="0"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(scoreInfoRef)"
              >完成</el-button
            >
          </span>
        </template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { searchUserByGradeService } from "~/service/user";
import {
  addAccessScore,
  getAccessInfo,
  getTemplateService,
} from "~/service/access";
import type {
  AccessItem,
  AccessResInfoType,
  ScoreAddType,
} from "~/types/Access";
import type { UserAllInfoType } from "~/types/User";
import { debounce } from "lodash";
let dialogVisible = ref(false);
const windowWidth = ref(window.innerWidth);
let dialogWidth = ref("35%");
onMounted(() => {
  if (windowWidth.value <= 800) {
    dialogWidth.value = "90%";
  } else {
    dialogWidth.value = "35%";
  }
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = debounce(() => {
  windowWidth.value = window.innerWidth;

  if (windowWidth.value <= 800) {
    dialogWidth.value = "90%";
  } else {
    dialogWidth.value = "35%";
  }
}, 200); // 设置防抖延迟时间，单位为毫秒

function changes(data: boolean) {
  dialogVisible.value = data;
}

const loading = ref(false);
const options = ref<Array<UserAllInfoType>>([]);
const accessInfo = ref<AccessResInfoType>();

let types = reactive<{ data: Array<AccessItem> }>({ data: [] });
const scoreInfoRef = ref<FormInstance>();
const scoreInfo = reactive<ScoreAddType>({
  pid: -1,
  scores: [],
  studentId: "",
});

//弹窗关闭的时候将控制显示的变量置为false，防止刷新时的关闭
const changeState = () => {
  dialogVisible.value = false;
};

const emit = defineEmits(["addAlert", "add_score_event"]);
watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("addAlert", true);
});

const searchUserByGrade = async (val: string) => {
  if (val.trim() != "") {
    loading.value = true;

    let res = await searchUserByGradeService(
      accessInfo.value?.subscribers as string,
      val
    );
    if (res.data.value.code == 20000) {
      options.value = res.data.value.data;
    }
    loading.value = false;
  }
};

async function postId(id: number) {
  scoreInfo.pid = id;

  let accessInfoRes = await getAccessInfo(id);
  if (accessInfoRes.data.value.code == 20000) {
    accessInfo.value = accessInfoRes.data.value.data;
    if (!id) {
      ElMessage({
        type: "error",
        message: "获取模版失败",
      });
    } else {
      const templateDataRes = await getTemplateService(id);
      if (templateDataRes.data.value.code === 20000) {
        types.data = JSON.parse(
          JSON.stringify(templateDataRes.data.value.data.types)
        );

        for (let i = 0; i < types.data.length; i++) {
          types.data[i].score = 0;
        }
      }
    }
  } else {
    ElMessage({
      type: "error",
      message: "获取考核信息失败",
    });
  }
}

defineExpose({ postId, changes });
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      for (let i = 0; i < types.data.length; i++) {
        scoreInfo.scores.push({
          name: types.data[i].name,
          score: types.data[i].score,
        });
      }
      const data: ScoreAddType = {
        pid: accessInfo.value?.id as number,
        scores: scoreInfo.scores,
        studentId: scoreInfo.studentId,
      };

      let res = await addAccessScore(data);
      if (res.data.value.code == 20000) {
        ElMessage({
          type: "success",
          message: "添加成功",
        });
        formEl.resetFields();
        scoreInfoRef.value?.resetFields();
        scoreInfo.scores = [];
        types.data = [];
        emit("add_score_event", true);
        dialogVisible.value = false;
      } else if (res.data.value.code === 51000) {
        ElMessage({
          type: "error",
          message: "该用户已录入成绩，请勿重复录入！",
        });
      } else {
        ElMessage({
          type: "error",
          message: "添加失败",
        });
      }
    } else {
      ElMessage({
        type: "warning",
        message: "表单填写不规范",
      });
    }
  });
};
</script>

<style lang="scss" scoped></style>

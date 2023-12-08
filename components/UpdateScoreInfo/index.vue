<template>
  <div class="">
    <ClientOnly>
      <el-dialog
        v-model="dialogVisible"
        title="修改考核成绩"
        width="30%"
        draggable
        @closed="changeState"
      >
        <el-form ref="scoreInfoRef">
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
import type { FormInstance } from "element-plus";
import { getTemplateService, getUserInfoByAccount } from "~/service/user";
import type { AccessItem, ScoreAddType } from "~/types/Access";
let dialogVisible = ref(false);

let types = reactive<{ data: Array<AccessItem> }>({ data: [] });
const scoreInfoRef = ref<FormInstance>();

const accessId = ref<number | string>("");
const scores = ref([]);
const userId = ref<number | string>("");

//弹窗关闭的时候将控制显示的变量置为false，防止刷新时的关闭
const changeState = () => {
  dialogVisible.value = false;
};

const emit = defineEmits(["updateScoreAlert", "update_score_event"]);
watch(dialogVisible, (newValue, oldValue) => {
  console.log(newValue);
  dialogVisible.value = newValue;
  emit("updateScoreAlert", true);
});

const postTemplate = async (row: any, pid: number) => {
  console.log(row, pid);
  accessId.value = pid;
  let { id, name, studentId, ...scoresList } = row;
  console.log(scoresList);
  scores.value = scoresList;
  console.log(scores.value);

  let userInfoRes = await getUserInfoByAccount(studentId);
  userId.value = userInfoRes.data.value.data.userId;
  let templateRes = await getTemplateService(pid);
  types.data = templateRes.data.value.data.types;
  for (let i = 0; i < types.data.length; i++) {
    types.data[i].score = scores.value[types.data[i].name];
  }
  console.log(types);
};
function updateAlertchanges(data: boolean) {
  dialogVisible.value = data;
}
defineExpose({ postTemplate, updateAlertchanges });
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(types.data);
};
</script>

<style lang="scss" scoped></style>

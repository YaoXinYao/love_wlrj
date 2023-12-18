<!-- 添加考核的组件 -->
<template>
  <div class="">
    <ClientOnly>
      <el-dialog
        v-model="dialogVisible"
        title="添加考核信息"
        :width="dialogWidth"
        draggable
        @closed="changeState"
      >
        <el-form
          ref="accessInfoRef"
          :model="accessInfo"
          class="demo-dynamic"
          :rules="rules"
        >
          <el-form-item prop="plan" label="考核名称">
            <el-input
              v-model="accessInfo.plan"
              placeholder="20字以内"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>

          <el-form-item prop="type" label="考核类别">
            <el-select v-model="accessInfo.type">
              <el-option label="笔试" value="笔试" />
              <el-option label="面试" value="面试" />
            </el-select>
          </el-form-item>
          <el-form-item prop="typeId" label="考核类型">
            <el-select v-model="accessInfo.typeId">
              <el-option
                v-for="(t, index) in typeList"
                :key="index"
                :label="t.typeName"
                :value="t.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="subscribers" label="考核对象">
            <el-select v-model="accessInfo.subscribers">
              <el-option
                v-for="(g, index) in allGrade"
                :key="index"
                :label="g"
                :value="g"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="subscribersType" label="考核对象方向">
            <el-select v-model="accessInfo.subscribersType">
              <el-option label="全体" value="" />
              <el-option label="前端" :value="1" />
              <el-option label="后端" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item prop="deadline" label="考核时间"
            ><el-date-picker
              v-model="accessInfo.deadline"
              type="datetime"
              placeholder="请选择考核时间"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              value-format="YYYY-MM-DD HH:mm:ss"
              time-format="A hh:mm:ss"
            />
          </el-form-item>
          <el-form-item prop="time" label="通知时间"
            ><el-date-picker
              v-model="accessInfo.time"
              type="datetime"
              placeholder="请选择邮箱通知时间"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              value-format="YYYY-MM-DD HH:mm:ss"
              time-format="A hh:mm:ss"
            />
          </el-form-item>
          <el-form-item prop="message" label="通知内容">
            <el-input
              v-model="accessInfo.message"
              :rows="2"
              type="textarea"
              maxlength="100"
              show-word-limit
              placeholder="邮箱通知内容..."
            />
          </el-form-item>
          <el-form-item prop="additional" label="补充说明">
            <el-input
              v-model="accessInfo.additional"
              :rows="2"
              type="textarea"
              maxlength="100"
              show-word-limit
              placeholder="补充..."
            />
          </el-form-item>
          <el-form-item
            v-show="accessInfo.type == '笔试'"
            v-for="(item, index) in accessInfo.types"
            :key="index"
            :label="`考核项${index + 1}`"
          >
            <div class="accessInfoInputs">
              <el-input v-model="item.name" />
              <el-input-number
                v-model="item.rate"
                :precision="2"
                :step="0.1"
                :max="1"
                :min="0"
              />
              <span
                class="mt-2"
                style="display: inline-block; width: max-content"
                @click.prevent="removeDomain(item)"
                ><img
                  style="width: 20px; cursor: pointer"
                  src="@/assets/image/删除.png"
                  alt="删除"
                  title="删除"
              /></span>
            </div>
          </el-form-item>
          <el-form-item v-show="accessInfo.type == '笔试'">
            <el-button
              type="success"
              plain
              @click="addAccess"
              :disabled="!isCanAdd"
              >添加考核项</el-button
            >
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(accessInfoRef)"
              >完成</el-button
            >
          </span>
        </template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { getAllGrade } from "~/service/user";
import {
  getAllTypesService,
  addAccessService,
  sendAccessNoticeService,
} from "~/service/access";
import type {
  AccessTypesType,
  AccessItem,
  AddAccessType,
  NoticeType,
} from "~/types/Access";
import { debounce } from "lodash";
let allGrade: Array<string>;
let typeList = ref<Array<AccessTypesType>>();
const isCanAdd = ref<boolean>(true);
const windowWidth = ref(window.innerWidth);
let dialogWidth = ref("35%");
onMounted(() => {
  getAllGrade().then((res) => {
    allGrade = res.data.value.data;
  });

  getAllTypesService().then((res: any) => {
    typeList.value = res.data.value.data;
  });
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

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  roleId: {
    type: Number,
  },
});

let dialogVisible = ref(false);
const accessInfoRef = ref<FormInstance>();

//弹窗关闭的时候将控制显示的变量置为false，防止刷新时的关闭
const changeState = () => {
  dialogVisible.value = false;
  accessInfo.plan = "";
  accessInfo.typeId = undefined;
  accessInfo.type = "笔试";
  accessInfo.deadline = "";
  accessInfo.subscribers = "";
  accessInfo.subscribersType = "";
  accessInfo.message = "";
  accessInfo.time = "";
  accessInfo.additional = "";
  accessInfo.types = [
    {
      name: "",
      rate: 0.0,
    },
  ];
};

watch(toRef(props, "dialogVisible"), (newValue, oldValue) => {
  dialogVisible.value = newValue;
});

const emit = defineEmits(["addAlert", "update_event"]);
watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("addAlert", dialogVisible.value);
  if (!newValue) {
    accessInfoRef.value?.resetFields();
  }
});

const accessInfo = reactive<AddAccessType>({
  plan: "",
  typeId: undefined,
  type: "笔试",
  deadline: "",
  subscribers: "",
  additional: "",
  subscribersType: "",
  message: "",
  time: "",
  types: [
    {
      name: "",
      rate: 0.0,
    },
  ],
});

watch(accessInfo, (newValue) => {
  if (newValue.types) {
    if (newValue.types?.length >= 6) {
      isCanAdd.value = false;
    } else {
      isCanAdd.value = true;
    }
  }
});

const validateNull = (rule: any, value: any, callback: any) => {
  if (value.trim() == "") {
    callback(new Error("内容不能为空"));
  } else {
    callback();
  }
};

const validateNumberNull = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("内容不能为空"));
  } else {
    callback();
  }
};

const validateNameNull = (rule: any, value: any, callback: any) => {
  if (value.trim() == "") {
    callback(new Error("内容不能为空"));
  } else if (value.trim().length > 20) {
    callback(new Error("超出最大限度"));
  } else {
    callback();
  }
};

const validateTypesNull = (rule: any, value: any, callback: any) => {
  for (let i = 0; i < value.length; i++) {
    if (value[i].name.trim() === "" || value[i].rate < 0) {
      callback(new Error("内容不能为空"));
      return;
    }
  }
  callback();
};

//校验
const rules = reactive<FormRules<typeof accessInfo>>({
  types: [{ validator: validateTypesNull, trigger: "blur" }],
  plan: [{ validator: validateNameNull, trigger: "blur" }],
  type: [{ validator: validateNull, trigger: "blur" }],
  typeId: [{ validator: validateNumberNull, trigger: "blur" }],
  deadline: [{ validator: validateNull, trigger: "blur" }],
  subscribers: [{ validator: validateNull, trigger: "blur" }],
  additional: [{ validator: validateNull, trigger: "blur" }],
  message: [{ validator: validateNull, trigger: "blur" }],
  time: [{ validator: validateNull, trigger: "blur" }],
});

const removeDomain = (item: AccessItem) => {
  const index = accessInfo.types?.indexOf(item) as number;
  if (index !== -1) {
    accessInfo.types?.splice(index, 1);
  }
};

const addAccess = () => {
  accessInfo.types?.push({
    name: "",
    rate: 0,
  });
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const result = await formEl.validate((valid) => {
    if (valid) {
    } else {
      ElMessage({
        type: "warning",
        message: "请完善表单",
      });
    }
  });
  if (result) {
    if (accessInfo.type == "笔试") {
      let sum: number = 0;
      if (accessInfo.types) {
        if (accessInfo.types.length == 0) {
          ElMessage({
            type: "warning",
            message: "请添加考核项",
          });
          return;
        }
        for (let i = 0; i < accessInfo.types.length; i++) {
          sum = sum * 1 + accessInfo.types[i]?.rate * 1;
        }
      }

      if (sum != 1) {
        ElMessage({
          type: "warning",
          message: "考核项分数百分比和为1",
        });
        return;
      }
    } else {
      accessInfo.types = undefined;
    }

    let { message, time, ...accessProps } = accessInfo;
    let noticeProps = {
      sbType: accessInfo.subscribersType,
      message,
      time,
      sb: accessInfo.subscribers,
    };

    addAccessService(accessProps).then(async (res: any) => {
      if (res.data.value.code === 20000) {
        ElMessage({
          type: "success",
          message: "添加成功",
        });
        emit("update_event", true);
        dialogVisible.value = false;
        let sendAccessNoticeRes = await sendAccessNoticeService(noticeProps);
        if (sendAccessNoticeRes.data.value.code == 20000) {
          ElMessage({
            type: "success",
            message: "考核通知发送成功",
          });
        } else {
          ElMessage({
            type: "error",
            message: "考核通知发送失败",
          });
        }
      } else if (res.data.value.code === 52003) {
        ElMessage({
          type: "warning",
          message: "该考核已存在，请重新编辑考核名称",
        });
      } else {
        ElMessage({
          type: "error",
          message: "添加失败，请检查网络",
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.accessInfoInputs {
  display: grid;
  width: 100%;
  grid-template-columns: 100px auto 60px;
  justify-content: space-around;
}
</style>

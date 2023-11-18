<template>
  <div class="">
    <ClientOnly>
      <el-dialog
        v-model="dialogVisible"
        title="添加考核信息"
        width="30%"
        draggable
      >
        <el-form
          ref="accessInfoRef"
          :model="accessInfo"
          class="demo-dynamic"
          :rules="rules"
        >
          <el-form-item prop="plan" label="考核名称">
            <el-input v-model="accessInfo.plan" placeholder="20字以内" />
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
          <el-form-item prop="additional" label="补充说明">
            <el-input
              v-model="accessInfo.additional"
              :rows="2"
              type="textarea"
              placeholder="补充..."
            />
          </el-form-item>
          <el-form-item
            v-for="(item, index) in JSON.parse(accessInfo.types)"
            :key="item.name"
            prop="additional"
            :label="`考核项${index + 1}`"
            :rules="{
              required: true,
              message: '内容不能为空',
              trigger: 'blur',
            }"
          >
            <div class="accessInfoInputs">
              <el-input v-model="item.name" />
              <el-input v-model="item.rate" />
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
          <el-form-item>
            <el-button type="success" plain @click="addAccess"
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
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { addAccessService, getAllGrade, getAllTypes } from "~/service/user";
import type {
  AccessTypesType,
  AccessItem,
  AddAccessType,
} from "~/types/Access";
let allGrade: Array<string>;
let typeList: Array<AccessTypesType>;
onMounted(() => {
  getAllGrade().then((res) => {
    console.log(res);
    allGrade = res.data.value.data;
  });

  getAllTypes().then((res) => {
    console.log(res.data.value.data);
    typeList = res.data.value.data;
  });
});

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
});

let dialogVisible = ref(false);

watch(toRef(props, "dialogVisible"), (newValue, oldValue) => {
  dialogVisible.value = newValue;
});

const emit = defineEmits(["addAlert"]);
watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("addAlert", dialogVisible.value);
});

const accessInfoRef = ref<FormInstance>();
const accessInfo = reactive<AddAccessType>({
  plan: "",
  typeId: undefined,
  type: "笔试",
  deadline: "",
  subscribers: "",
  additional: "",
  types: JSON.stringify([
    {
      name: "选择",
      rate: 0,
    },
    {
      name: "填空",
      rate: 0,
    },
    {
      name: "简答",
      rate: 0,
    },
  ]),
});

const validateTypes = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error("请添加考核项"));
  } else {
    let flag = false;
    for (let i = 0; i < value.length; i++) {
      if (value[i].name.trim() != "" && value[i].rate.trim() != "") {
        flag = true;
      }
    }
    if (!flag) {
      callback(new Error("考核项内容不能为空"));
    } else {
      callback();
    }
  }
};

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

//校验
const rules = reactive<FormRules<typeof accessInfo>>({
  types: [{ validator: validateTypes, trigger: "blur" }],
  plan: [{ validator: validateNameNull, trigger: "blur" }],
  type: [{ validator: validateNull, trigger: "blur" }],
  typeId: [{ validator: validateNumberNull, trigger: "blur" }],
  deadline: [{ validator: validateNull, trigger: "blur" }],
  subscribers: [{ validator: validateNull, trigger: "blur" }],
  additional: [{ validator: validateNull, trigger: "blur" }],
});

const removeDomain = (item: AccessItem) => {
  const index = JSON.parse(accessInfo.types).indexOf(item);
  if (index !== -1) {
    JSON.parse(accessInfo.types).splice(index, 1);
  }
};

const addAccess = () => {
  JSON.parse(accessInfo.types).push({
    name: "",
    rate: 0,
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(accessInfo);

  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log(accessInfo);

      let res = await addAccessService(accessInfo);
      console.log(res);

      // dialogVisible.value = false;
    } else {
      ElMessage({
        type: "warning",
        message: "请完善表单",
      });
      return false;
    }
  });
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

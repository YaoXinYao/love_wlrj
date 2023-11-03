<template>
  <div class="">
    <ClientOnly>
      <el-dialog
        v-model="dialogVisible"
        title="添加考核信息"
        width="30%"
        draggable
      >
        <el-form ref="formRef" :model="accessValidateForm" class="demo-dynamic">
          <el-form-item
            prop="name"
            label="考核名称"
            :rules="[
              {
                required: true,
                message: '请输入考核名称',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="accessValidateForm.name" />
          </el-form-item>
          <el-form-item
            prop="type"
            label="考核类型"
            :rules="[
              {
                required: true,
                message: '请选择考核类型',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="accessValidateForm.type" />
          </el-form-item>
          <el-form-item
            prop="accessType"
            label="考核类别"
            :rules="[
              {
                required: true,
                message: '请输入考核类别',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="accessValidateForm.accessType" />
          </el-form-item>
          <el-form-item
            prop="accessTime"
            label="考核时间"
            :rules="[
              {
                required: true,
                message: '请输入考核时间',
                trigger: 'blur',
              },
            ]"
            ><el-date-picker
              v-model="accessValidateForm.accessTime"
              type="datetime"
              placeholder="请选择考核时间"
            />
          </el-form-item>
          <el-form-item
            v-for="(item, index) in accessValidateForm.items"
            :key="item.key"
            :prop="'items' + index + '.value'"
          >
            <div class="accessInfoInputs">
              <el-input v-model="item.key" />
              <el-input v-model="item.value" />
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
            <el-button type="primary" @click="submitForm(formRef)"
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
import type { FormInstance } from "element-plus";

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
const formRef = ref<FormInstance>();
const accessValidateForm = reactive<{
  items: AccessItem[];
  name: string;
  accessType: string;
  type: string;
  accessTime: string;
}>({
  name: "",
  accessType: "笔试",
  type: "头脑风暴",
  accessTime: "2023-11-02",
  items: [
    {
      key: "选择",
      value: "",
    },
    {
      key: "填空",
      value: "",
    },
    {
      key: "简答",
      value: "",
    },
  ],
});

interface AccessItem {
  key: string;
  value: string;
}

const removeDomain = (item: AccessItem) => {
  const index = accessValidateForm.items.indexOf(item);
  if (index !== -1) {
    accessValidateForm.items.splice(index, 1);
  }
};

const addAccess = () => {
  accessValidateForm.items.push({
    key: "",
    value: "",
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(accessValidateForm);
      dialogVisible.value = false;
    } else {
      console.log("error submit!");
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

import type { Loading } from 'element-plus/es/components/loading/src/service';
import type { add } from 'lodash';
<template>
  <div class="">
    <ClientOnly>
      <el-dialog
        v-model="dialogVisible"
        title="添加考核信息"
        width="30%"
        draggable
        :closed="changeState"
      >
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm()">完成</el-button>
          </span>
        </template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { getTemplateService } from "~/service/user";
import type { AccessItem } from "~/types/Access";
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    reactive: true,
  },
});

console.log("我是子组件：", props.id);

let dialogVisible = ref(false);
let types = reactive<Array<AccessItem>>([]);

//弹窗关闭的时候将控制显示的变量置为false，防止刷新时的关闭
const changeState = () => {
  dialogVisible.value = false;
};

watch(toRef(props, "dialogVisible"), (newValue, oldValue) => {
  dialogVisible.value = newValue;
});

const emit = defineEmits(["addAlert", "update_event"]);
watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("addAlert", dialogVisible.value);
});

async function postId(value: number) {
  const templateDataRes = await getTemplateService(value);
  if (templateDataRes.data.value.code === 20000) {
    console.log(templateDataRes.data.value.data.types);
    let typesStr = templateDataRes.data.value.data.types;
    const types = typesStr.substring(1, typesStr.length - 1);
    console.log(types);

    console.log(typeof types);

    console.log(types);
  } else {
    ElMessage({
      type: "error",
      message: "获取模版失败",
    });
  }
}

defineExpose({ postId });

const submitForm = () => {};
</script>

<style lang="scss" scoped></style>

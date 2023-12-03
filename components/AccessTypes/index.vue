<template>
  <ClientOnly>
    <el-dialog
      v-model="updateTypeDialogVisible"
      title="修改考核类型"
      width="30%"
      @closed="changeUpdateTypesState"
    >
      <el-input v-model="updateTypeText"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateTypeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateType"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible"
      title="考核类型管理"
      width="30%"
      draggable
      @closed="changeTypesState"
    >
      <div>
        <el-popconfirm
          title="操作"
          confirm-button-text="修改"
          cancel-button-text="删除"
          confirm-button-type="warning"
          cancel-button-type="danger"
          v-for="(t, index) in typesList"
          :key="t.id"
          @confirm="updateTag(t.id, t.typeName)"
          @cancel="deleteTag(t.id)"
        >
          <template #reference
            ><el-tag class="tag">{{ t.typeName }}</el-tag></template
          ></el-popconfirm
        >

        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="addTagValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter.native="enterConfirm($event)"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          +
        </el-button>
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  addAccessTypeService,
  deleteTypeByIdService,
  getAllTypesService,
  updateTypeService,
} from "~/service/user";
import { onMounted } from "vue";
import type { TypesType } from "~/types/Access";
import type { ElInput } from "element-plus";
onMounted(() => {
  getTypesList();
});
const typesList = ref<Array<TypesType>>();
const InputRef = ref<InstanceType<typeof ElInput>>();
const dialogVisible = ref(false);
const inputVisible = ref(false);
const updateTypeDialogVisible = ref(false);
const addTagValue = ref("");
const updateTypeText = ref("");
const updateTypeId = ref();

const emit = defineEmits(["typeAlert"]);

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
});

//弹窗关闭的时候将控制显示的变量置为false，防止刷新时的关闭
const changeTypesState = () => {
  dialogVisible.value = false;
};

const changeUpdateTypesState = () => {
  updateTypeDialogVisible.value = false;
  updateTypeId.value = "";
  updateTypeText.value = "";
};

const updateType = async () => {
  try {
    let updateTyeRes = await updateTypeService({
      id: updateTypeId.value,
      name: updateTypeText.value,
    });
    if (updateTyeRes.data.value.code === 20000) {
      ElMessage({
        type: "success",
        message: "修改成功",
      });
      updateTypeDialogVisible.value = false;
      updateTypeId.value = "";
      updateTypeText.value = "";
      getTypesList();
    } else {
      ElMessage({
        type: "error",
        message: "修改失败",
      });
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: "修改失败，请检查是否重复添加",
    });
  }
};

watch(dialogVisible, (newValue, oldValue) => {
  dialogVisible.value = newValue;
  emit("typeAlert", newValue);
});

watch(toRef(props, "dialogVisible"), (newValue, oldValue) => {
  dialogVisible.value = newValue;
});

const getTypesList = async () => {
  let getTypesListRes = await getAllTypesService();
  typesList.value = getTypesListRes.data.value.data;
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const enterConfirm = (e: any) => {
  e.target.blur();
};

const handleInputConfirm = async () => {
  if (addTagValue.value.trim()) {
    if (addTagValue.value.length > 8) {
      ElMessage({
        type: "warning",
        message: "标签内容长度不可超过8",
      });
    } else {
      try {
        let addTypeRes = await addAccessTypeService(addTagValue.value);
        if (addTypeRes.data.value.code === 20000) {
          ElMessage({
            type: "success",
            message: "添加成功",
          });
          getTypesList();
        } else {
          ElMessage({
            type: "error",
            message: "添加失败，请检查网络",
          });
        }
      } catch (error) {
        ElMessage({
          type: "error",
          message: "添加失败，请检查是否重复添加",
        });
      }
    }
  } else {
    ElMessage({
      type: "warning",
      message: "内容不能为空",
    });
  }
  inputVisible.value = false;
  addTagValue.value = "";
};

const updateTag = (id: number | string, name: string) => {
  updateTypeDialogVisible.value = true;
  updateTypeId.value = id;
  updateTypeText.value = name;
};

const deleteTag = (id: number | string) => {
  ElMessageBox.confirm("你确定要删除该消息吗？")
    .then(async () => {
      let deleteTypeRes = await deleteTypeByIdService([id]);
      if (deleteTypeRes.data.value.code == 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getTypesList();
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
</script>

<style lang="scss" scoped>
.tag {
  margin: 8px 8px;
  cursor: pointer;
}

.button-new-tag {
  font-size: 16px;
}

.ml-1 {
  width: 68px;
}
</style>
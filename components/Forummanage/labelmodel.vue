<template>
  <div class="forumModel">
    <!-- 标签管理 -->
    <el-dialog v-model="labelModel" title="标签管理" width="440px">
      <el-tag
        v-for="item in labels"
        :key="item.labelName"
        class="mx-1"
        closable
        :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
        @close="handleClose(item.labelName)"
      >
        {{ item.labelName }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        v-model="inputLabel"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
      >
        + 添加标签
      </el-button>
    </el-dialog>
    <!-- 分栏管理 -->
    <el-dialog v-model="subfieldModel" title="分栏管理" width="440px">
      <el-tag
        v-for="item in subfields"
        :key="item.labelName"
        class="mx-1"
        closable
        :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
        @close="subfieldClose(item.labelName)"
      >
        {{ item.labelName }}
      </el-tag>
      <el-input
        v-if="subfieldVisible"
        v-model="subfieldLabel"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="subfieldInputConfirm"
        @blur="subfieldInputConfirm"
      />
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="subfieldInput"
      >
        + 添加分栏
      </el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import { forumManage } from "~/store/forum";
let manage = forumManage();
let { labelModel, subfieldModel, labels } = storeToRefs(manage);
let inputLabel = ref("");
interface Label {
  labelId: number;
  labelName: string;
}
const inputVisible = ref(false);
let subfields: Ref<Label[]> = ref([]);
const subfieldVisible = ref(false);
let subfieldLabel = ref("");
function getRandomTagType() {
  const tagTypes = ["success", "info", "warning", "danger", ""];
  return tagTypes[Math.floor(Math.random() * tagTypes.length)] as
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "";
}
// 标签管理
const handleClose = (tag: string) => {
  for (let i = 0; i < labels.value.length; i++) {
    if (labels.value[i].labelName == tag) {
      labels.value.splice(i, 1);
    }
  }
};
const showInput = () => {
  inputVisible.value = true;
};
const handleInputConfirm = async () => {
  if (inputLabel.value) {
    // const {data} = await postLabel(inputLabel.value)
    // console.log("添加标签",data.value);
  }
  inputVisible.value = false;
  inputLabel.value = "";
};

// 分栏管理
const subfieldClose = (subfiseld: string) => {
  for (let i = 0; i < subfields.value.length; i++) {
    if (subfields.value[i].labelName == subfiseld) {
      subfields.value.splice(i, 1);
    }
  }
};
const subfieldInput = () => {
  subfieldVisible.value = true;
};
const subfieldInputConfirm = () => {
  if (subfieldLabel.value) {
  }
  subfieldVisible.value = false;
  subfieldLabel.value = "";
};
</script>

<style lang="scss" scoped>
.el-tag.is-closable {
  margin-right: 7px;
  margin-bottom: 10px;
}
</style>

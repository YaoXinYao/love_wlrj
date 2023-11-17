<template>
  <div class="forumModel">
    <el-dialog v-model="labelModel" title="标签管理" width="440px">
      <el-tag
        v-for="item in labels"
        :key="item.labelName"
        class="mx-1"
        closable
        :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
        @close="handleClose(item.labelId)"
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
    <el-dialog v-model="subfieldModel" title="分栏管理" width="440px">
      <el-tag
        v-for="item in subfields"
        :key="item.subName"
        class="mx-1"
        closable
        :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
        @close="subfieldClose(item.subId)"
      >
        {{ item.subName }}
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
    <el-dialog v-model="deleteNews" title="提示信息" width="400px">
      <span>确定要删除此标签？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="shutSure">确定</el-button>
          <el-button @click="deleteNews = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="subfieldNews" title="提示信息" width="400px">
      <span>确定要删除此分栏？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="shutNews">确定</el-button>
          <el-button @click="subfieldNews = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { forumManage } from "~/store/forum";
const tagTypes = ["success", "info", "warning", "danger", ""];
let manage = forumManage();
let { labelModel, subfieldModel, labels, subfields} = storeToRefs(manage);
let ids = 0;
let deleteNews = ref(false);
let inputLabel = ref("");
const inputVisible = ref(false);

let subids = 0;
let subfieldNews = ref(false);
let subfieldLabel = ref("");
const subfieldVisible = ref(false);
const successMessage = (news: string, type: any) => {
  ElMessage({
    message: news,
    type,
  });
};
//随机生成标签颜色
function getRandomTagType() {
  return tagTypes[Math.floor(Math.random() * tagTypes.length)] as
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "";
}
// --------------------------标签管理---------------------------------
const handleClose = (id: number) => {
  ids = id;
  deleteNews.value = true;
};
function shutSure() {
  manage.labelDelete(ids).then((result) => {
    if (result == 20000) {
      manage.labelInfo(1, 100);
      successMessage("删除标签成功", "success");
    } else {
      successMessage("删除标签失败", "danger");
    }
  });
  deleteNews.value = false;
}
const showInput = () => {
  inputVisible.value = true;
};
const handleInputConfirm = async () => {
  if (inputLabel.value) {
    manage.addLabel(inputLabel.value).then((result) => {
      if (result == 20000) {
        manage.labelInfo(1, 100);
        successMessage("添加标签成功", "success");
      } else if (result == 53003) {
        successMessage("标签已经存在", "warning");
      } else {
        successMessage("添加标签失败", "error");
      }
    });
  }
  inputVisible.value = false;
  inputLabel.value = "";
};

//-------------------------分栏管理-----------------------------
const subfieldClose = (id: number) => {
  subids = id;
  subfieldNews.value = true;
};
function shutNews() {
  manage.subfieldDelete(subids).then((result) => {
    if (result == 20000) {
      manage.subfieldInfo(1, 100);
      successMessage("删除分栏成功", "success");
    } else {
      successMessage("删除分栏失败", "danger");
    }
  });
  subfieldNews.value = false;
}
const subfieldInput = () => {
  subfieldVisible.value = true;
};
const subfieldInputConfirm = () => {
  if (subfieldLabel.value) {
    manage.addSubfield(subfieldLabel.value).then((result) => {
      if (result == 20000) {
        manage.subfieldInfo(1, 100);
        successMessage("添加分栏成功", "success");
      } else if (result == 53003) {
        successMessage("分栏已经存在", "warning");
      } else {
        successMessage("添加分栏失败", "danger");
      }
    });
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

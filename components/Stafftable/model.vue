import type { uploadBaseProps } from 'element-plus';
<template>
  <!-- Form -->
  <!-- ElementUI的Upload组件的action属性指定上传文件的URL地址。 -->
  <el-dialog v-model="modelState" title="成员导入" width="635px">
    <el-upload
      class="upload-demo"
      ref="uploadFiles"
      action="#"
      :auto-upload="false"
      accept=".xls,.xlsx"
      drag="true"
      @change="handelUpload($event)"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖拽到此处或者<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">仅允许导入xls,xlsx文件</div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitFiles">确定</el-button>
        <el-button @click="closeDialog"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore } from "~/store/staff";
import { reactive, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadInstance } from "element-plus";
const staffStore = useStaffStore();
const uploadFiles = ref<UploadInstance>();
let { modelState } = storeToRefs(staffStore);
let formData: any = new FormData();
function handelUpload(file) {
  //获取上传文件的后缀
  let fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (fileName == "xls" || fileName == "xlsx") {
    console.log("类型正确，开始上传");
    formData.append("files", file.raw);
    //查看formData里面的数据
    for (var [a, b] of formData.entries()) {
      console.log(a, b);
    }
  } else {
    alert("请选择正确的文件格式");
    uploadFiles.value!.handleRemove(file);
    return;
  }
}
function submitFiles() {
  modelState.value = false;
  uploadFiles.value!.submit();
  uploadFiles.value!.clearFiles();
  formData.set('files', '');
}
function closeDialog() {
  modelState.value = false;
  uploadFiles.value!.clearFiles();
  formData.set('files', '');
}
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

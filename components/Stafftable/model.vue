<template>
  <!-- 批量导入成员 -->
  <!-- ElementUI的Upload组件的action属性指定上传文件的URL地址。 -->
  <el-dialog v-model="modelState" title="成员导入" width="500px">
    <el-upload
      class="upload-demo"
      ref="uploadFiles"
      action="/zinfo/user/user/importUser"
      method="post"
      :auto-upload="false"
      accept=".xls,.xlsx"
      drag
      :headers="{ Authorization: Authtoken() }"
      :before-upload="handelUpload"
      :on-error="errorFun"
      :on-success="successFun"
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
  <!-- 删除弹窗 -->
  <el-dialog v-model="deleteModel" title="提示信息" width="400px">
    <span>确定要删除成员数据？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteStaff">确定</el-button>
        <el-button @click="deleteModel = false"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 查看成员信息 -->
  <el-dialog v-model="editModel" title="成员信息" width="400px" class="edit">
    <el-form>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userName" disabled />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userSexVal" disabled />
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userAccount" disabled />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userEmail" disabled />
      </el-form-item>
      <el-form-item label="QQ" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userQq" disabled />
      </el-form-item>
      <el-form-item label="年级" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userGrade" disabled />
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userClass" disabled />
      </el-form-item>
      <el-form-item label="方向" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.groupName" disabled />
      </el-form-item>
      <el-form-item label="博客链接" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userBlog" disabled />
      </el-form-item>
      <el-form-item label="成绩" :label-width="formLabelWidth">
        <el-button type="success">成绩详情</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editModel = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore } from "~/store/staff";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadFile, UploadFiles, UploadInstance } from "element-plus";
const formLabelWidth = "80px";
const staffStore = useStaffStore();
const uploadFiles = ref<UploadInstance>();
let { modelState, deleteModel, editModel, signleInfo } =
  storeToRefs(staffStore);
let formData: any = new FormData();
//导入文件
let {
  modelState,
  deleteModel,
  editModel,
  signleInfo,
  users,
  total,
  signleDelete,
  isSignle,
  moreDelete,
} = storeToRefs(staffStore);
//文件上传前类型判断
function handelUpload(file: any) {
  //获取上传文件的后缀
  let fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (fileName == "xls" || fileName == "xlsx") {
  } else {
    ElMessage.warning("请选择正确的文件");
    uploadFiles.value!.handleRemove(file);
  }
}
//上传文件
function submitFiles() {
  uploadFiles.value!.submit();
  setTimeout(() => {
    modelState.value = false;
    uploadFiles.value!.clearFiles();
  }, 1000);
}
//上传成功的钩子
const successFun = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  ElMessage.success("导入成功");
  staffStore.getAllUser(1, 7).then((res) => {
    if (res.code == 20000) {
      users.value = res.data?.records;
      total.value = res.data?.total;
    } else {
      ElMessage.error("获取人员数据失败");
    }
  });
};
//上传失败的钩子
const errorFun = (
  error: Error,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  ElMessage.error("导入失败");
};
//关闭弹窗
function closeDialog() {
  uploadFiles.value!.clearFiles();
  modelState.value = false;
}
//删除成员
function deleteStaff() {
  console.log("判断",isSignle.value);
  
  if (isSignle.value) {
    staffStore.deleteMore(moreDelete.value)
    .then((res) => {
      if (res == 20000) {
        ElMessage.success("删除多个成功");
        staffStore.getAllUser(1, 7).then((res) => {
          if (res.code == 20000) {
            users.value = res.data?.records;
            total.value = res.data?.total;
          } else {
            ElMessage.error("获取人员数据失败");
          }
        });
      } else {
        ElMessage.error("删除失败");
      }
    });
  } else {
    staffStore.deleteSignle(signleDelete.value).then((res) => {
      if (res == 20000) {
        ElMessage.success("删除成功");
        staffStore.getAllUser(1, 7).then((res) => {
          if (res.code == 20000) {
            users.value = res.data?.records;
            total.value = res.data?.total;
          } else {
            ElMessage.error("获取人员数据失败");
          }
        });
      } else {
        ElMessage.error("删除失败");
      }
    });
  }
  deleteModel.value = false;
}
</script>
<style lang="scss" scoped>
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
.el-input.is-disabled .el-input__wrapper {
  background-color: white;
  .el-input__inner {
    color: #606266;
    -webkit-text-fill-color: #606266;
  }
}
</style>

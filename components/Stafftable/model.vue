<template>
  <!-- 批量导入成员 -->
  <!-- ElementUI的Upload组件的action属性指定上传文件的URL地址。 -->
  <el-dialog v-model="modelState" title="成员导入" width="635px">
    <el-upload
      class="upload-demo"
      ref="uploadFiles"
      action="#"
      :auto-upload="false"
      accept=".xls,.xlsx"
      drag
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
  <!-- 添加成员 -->
  <el-dialog v-model="addModel" title="新增成员">
    <el-form :model="staffInfo">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="staffInfo.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="staffInfo.sex" placeholder="请选择你的性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth">
        <el-input v-model="staffInfo.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="院系" :label-width="formLabelWidth">
        <el-input v-model="staffInfo.coolege" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年级" :label-width="formLabelWidth">
        <el-input v-model="staffInfo.grade" autocomplete="off" />
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth">
        <el-input v-model="staffInfo.class" autocomplete="off" />
      </el-form-item>
      <el-form-item label="方向" :label-width="formLabelWidth">
        <el-input v-model="staffInfo.direction" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addModel = false"> 添加 </el-button>
        <el-button @click="addModel = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除弹窗 -->
  <el-dialog v-model="deleteModel" title="提示信息" width="30%">
    <span>确定要删除此成员数据？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteStaff">确定</el-button>
        <el-button @click="deleteModel = false"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 编辑成员信息 -->
  <el-dialog v-model="editModel" title="成员信息">
    <el-form :model="editInfo">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="editInfo.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="editInfo.sex" placeholder="请选择你的性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth">
        <el-input v-model="editInfo.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="院系" :label-width="formLabelWidth">
        <el-input v-model="editInfo.coolege" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年级" :label-width="formLabelWidth">
        <el-input v-model="editInfo.grade" autocomplete="off" />
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth">
        <el-input v-model="editInfo.class" autocomplete="off" />
      </el-form-item>
      <el-form-item label="方向" :label-width="formLabelWidth">
        <el-input v-model="editInfo.direction" autocomplete="off" />
      </el-form-item>
      <el-form-item label="博客" :label-width="formLabelWidth">
        <el-input v-model="editInfo.blog" autocomplete="off" />
      </el-form-item>
      <el-form-item label="成绩" :label-width="formLabelWidth">
        <el-button type="success">成绩详情</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="editModel = false"> 修改 </el-button>
        <el-button @click="editModel = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore, staffForm } from "~/store/staff";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadInstance } from "element-plus";
const formLabelWidth = "140px";
const staffStore = useStaffStore();
const uploadFiles = ref<UploadInstance>();
let { modelState, deleteModel, addModel, editModel } = storeToRefs(staffStore);
let formData: any = new FormData();
//导入文件
function handelUpload(file: any) {
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
  uploadFiles.value!.submit();
  setTimeout(() => {
    modelState.value = false;
    uploadFiles.value!.clearFiles();
    formData.set("files", "");
  }, 1000);
}
function closeDialog() {
  modelState.value = false;
  uploadFiles.value!.clearFiles();
  formData.set("files", "");
}
//添加成员
let staffInfo: staffForm = reactive({
  name: "",
  code: "",
  class: "",
  coolege: "",
  blog: "",
  direction: "",
  grade: "",
  sex: "",
});
//删除成员
function deleteStaff() {
  deleteModel.value = false;
}
//编辑成员
let editInfo = reactive({
  id: "000000",
  name: "111",
  code: "22",
  class: "3333",
  coolege: "4444",
  blog: "555",
  direction: "66666",
  grade: "66666",
  sex: "男",
});
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

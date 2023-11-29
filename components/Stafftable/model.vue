<template>
  <!-- 管理组别 -->
  <el-dialog v-model="manageGroup" title="组别管理" width="440px">
    <el-tag
      v-for="item in teamData"
      :key="item.groupId"
      class="mx-1"
      closable
      :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
      @close="handleClose(item.groupId)"
    >
      {{ item.groupName }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      v-model="inputGroup"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
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
  <!-- 批量导入成员 -->
  <!-- ElementUI的Upload组件的action属性指定上传文件的URL地址。 -->
  <el-dialog v-model="modelState" title="成员导入" width="500px">
    <div class="condition">
      <el-select v-model="team" placeholder="请选择组别">
        <el-option
          v-for="item in teamData"
          :key="item.groupId"
          :label="item.groupName"
          :value="item.groupId"
        />
      </el-select>
      <el-select v-model="role" placeholder="请选择角色">
        <el-option
          v-for="item in roleData"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId"
        />
      </el-select>
    </div>
    <el-upload
      class="upload-demo"
      ref="uploadFiles"
      action="/zinfo/user/user/importUser"
      method="post"
      :auto-upload="false"
      :multiple="false"
      :limit="1"
      accept=".xls,.xlsx"
      drag
      :headers="{ Authorization: Authtoken() }"
      :before-upload="handelUpload"
      :on-error="errorFun"
      :on-success="successFun"
      :on-exceed="exceedFun"
      :on-change="changeFun"
      :before-remove="beforeRemove"
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
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.roleName" disabled />
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userClass" disabled />
      </el-form-item>
      <el-form-item label="方向" :label-width="formLabelWidth">
        <el-select v-model="signleInfo.groupName">
          <el-option
            v-for="item in signleInfo.singleTeam"
            :key="item.groupId"
            :label="item.groupName"
            :value="item.groupId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="博客链接" :label-width="formLabelWidth">
        <el-input v-bind:value="signleInfo.userBlog" disabled />
      </el-form-item>
      <!-- <el-form-item label="成绩" :label-width="formLabelWidth">
        <el-button type="success">成绩详情</el-button>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="editGroup">修改</el-button>
        <el-button @click="editModel = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="deleteConfrom" title="提示信息" width="400px">
    <span>确定要删除此组别？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="shutSure">确定</el-button>
        <el-button @click="deleteConfrom = false"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="manageRole"
    title="修改角色"
    width="540px"
    class="setRole"
  >
    确定要将
    <el-select v-model="setGrade" placeholder="请选择年级">
      <el-option
        v-for="item in grades"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    设置成
    <el-select v-model="setRole" placeholder="请选择角色">
      <el-option
        v-for="item in roleData"
        :key="item.roleId"
        :label="item.roleName"
        :value="item.roleId"
      />
    </el-select>
    这个角色吗？
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="upadterole">确定</el-button>
        <el-button @click="updateShut"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore } from "~/store/staff";
import { UploadFilled } from "@element-plus/icons-vue";
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadUserFile,
} from "element-plus";
const formLabelWidth = "80px";
const staffStore = useStaffStore();
const uploadFiles = ref<UploadInstance>();
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
  manageGroup,
  curTable,
  group,
  input,
  grade,
  grades,
  manageRole,
} = storeToRefs(staffStore);
let team = ref("");
let role = ref("");
let setGrade = ref("");
let setRole = ref("");
let roleData = ref<any[]>([]);
let teamData = ref<any[]>([]);
let fileList = false;
let deleteConfrom = ref(false);
let ids = 0;
let inputGroup = ref("");
const inputVisible = ref(false);
onMounted(() => {
  staffStore.getGrades();
});
//随机生成标签颜色
const tagTypes = ["success", "info", "warning", "danger", ""];
function getRandomTagType() {
  return tagTypes[Math.floor(Math.random() * tagTypes.length)] as
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "";
}
//获取组别
function getAllGroups() {
  staffStore.getAllGroup().then((res) => {
    teamData.value = res;
  });
}
getAllGroups();
//获取角色
function getAllRoles() {
  staffStore.getAllRole().then((res) => {
    roleData.value = res;
  });
}
getAllRoles();
//文件上传前类型判断
function handelUpload(file: any) {
  if (file.size == 0) {
    ElMessage.warning("上传文件不能为空");
    return false;
  } else {
    //获取上传文件的后缀
    let fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
    if (fileName == "xls" || fileName == "xlsx") {
    } else {
      ElMessage.warning("请选择正确的文件");
      uploadFiles.value!.handleRemove(file);
      return false;
    }
  }
}
//上传文件
function submitFiles() {
  if (team.value == "" || role.value == "") {
    ElMessage.warning("分组或角色不能为空");
  } else if (!fileList) {
    ElMessage.warning("请导入上传文件");
  } else {
    //为导入用户设置默认组别
    staffStore.defaultGroups(Number(team.value)).then((res) => {
      if (res == 20000) {
        //为导入用户设置默认角色
        staffStore.defaultRoles(Number(role.value)).then((res) => {
          if (res == 20000) {
            uploadFiles.value!.submit();
            setTimeout(() => {
              modelState.value = false;
              uploadFiles.value!.clearFiles();
              team.value=""
              role.value=""
            }, 1000);
          } else {
            ElMessage.error("导入失败");
          }
        });
      } else {
        ElMessage.error("导入失败");
      }
    });
  }
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
//超出文件数量的钩子
const exceedFun = (files: File[], uploadFiles: UploadUserFile[]) => {
  ElMessage.warning("只允许上传一个文件");
};
//文件删除之前调用的钩子
const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  fileList = false;
  return true;
};
//文件发生变化
const changeFun = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (uploadFiles.length != 0) {
    fileList = true;
  }
};
//关闭弹窗
function closeDialog() {
  uploadFiles.value!.clearFiles();
  modelState.value = false;
  team.value=""
  role.value=""
}
//删除成员
function deleteStaff() {
  if (isSignle.value) {
    staffStore.deleteMore(moreDelete.value).then((res) => {
      if (res == 20000) {
        ElMessage.success("删除成员成功");
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
//修改用户的组别
const editGroup = () => {
  let userId = signleInfo.value.userId;
  let groupId = Number(signleInfo.value.groupName);
  staffStore.setGroup(groupId, userId).then((res) => {
    if (res == 20000) {
      ElMessage.success("修改成功");
      let groupId;
      if (group.value == "") {
        groupId = undefined;
      } else {
        groupId = Number(group.value);
      }
      staffStore
        .getAllUser(curTable.value, 7, groupId, input.value, grade.value)
        .then((res) => {
          if (res.code == 20000) {
            users.value = res.data?.records;
            total.value = res.data?.total;
          } else if (res.code == 400006) {
            users.value = [];
            total.value = 0;
            ElMessage.success("暂无数据");
          } else {
            ElMessage.error("更新人员加载失败");
          }
        });
      editModel.value = false;
    } else {
      ElMessage.error("修改失败");
    }
  });
};
//组别管理
function handleClose(id: number) {
  ids = id;
  deleteConfrom.value = true;
}
function shutSure() {
  staffStore.deleteGroups(ids).then((res) => {
    if (res == 20000) {
      ElMessage.success("删除组别成功");
      getAllGroups();
      deleteConfrom.value = false;
    } else {
      ElMessage.error("删除组别失败");
    }
  });
}
const handleInputConfirm = () => {
  //trim()去除两端空格
  if (inputGroup.value.trim()) {
    staffStore.addGroups(inputGroup.value).then((res) => {
      if (res == 20000) {
        ElMessage.success("添加成功");
        inputVisible.value = false;
        inputGroup.value = "";
        getAllGroups();
      } else if (res == 52003) {
        ElMessage.warning("组别已存在");
      } else {
        ElMessage.error("添加失败");
      }
    });
  } else {
    ElMessage.warning("输入内容不能为空");
  }
};
const showInput = () => {
  inputVisible.value = true;
};
//修改用户角色
const upadterole = () => {
  if (setGrade.value == "" || setRole.value == "") {
    ElMessage.warning("请完善信息");
  } else {
    let rid = Number(setRole.value);
    staffStore.updateGrade(setGrade.value, rid).then((res) => {
      if (res == 20000) {
        ElMessage.success("修改成功");
        let groupId;
        if (group.value == "") {
          groupId = undefined;
        } else {
          groupId = Number(group.value);
        }
        staffStore
          .getAllUser(curTable.value, 7, groupId, input.value, grade.value)
          .then((res) => {
            if (res.code == 20000) {
              users.value = res.data?.records;
              total.value = res.data?.total;
            } else if (res.code == 400006) {
              users.value = [];
              total.value = 0;
              ElMessage.success("暂无数据");
            } else {
              ElMessage.error("更新人员加载失败");
            }
          });
        setGrade.value = "";
        setRole.value = "";
        manageRole.value = false;
      } else {
        ElMessage.error("修改失败");
      }
    });
  }
};
const updateShut = () => {
  setGrade.value = "";
  setRole.value = "";
  manageRole.value = false;
};
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
.condition {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  margin-bottom: 15px;
  .el-select {
    width: 200px;
  }
}
.el-tag.is-closable {
  margin-right: 7px;
  margin-bottom: 10px;
}
.setRole {
  .el-select {
    width: 150px;
  }
}
</style>
